import { Octokit } from 'octokit';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { title, code, framework, elementId } = await req.json();
    
    const token = process.env.GITHUB_TOKEN;
    const repoPath = process.env.GITHUB_REPO; // Expected format: "owner/repo"

    if (!token || !repoPath) {
      return NextResponse.json({ error: 'GitHub configuration missing' }, { status: 500 });
    }

    const [owner, repo] = repoPath.split('/');
    const octokit = new Octokit({ auth: token });

    // Sanitize title for filename
    const filename = `${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.tsx`;
    const path = `elements/${framework.toLowerCase()}/${filename}`;

    // 1. Try to get the file to see if it exists (need SHA to update)
    let sha: string | undefined;
    try {
      const { data } = await octokit.rest.repos.getContent({
        owner,
        repo,
        path,
      });
      if (Array.isArray(data)) throw new Error('Path is a directory');
      sha = data.sha;
    } catch (e: any) {
      if (e.status !== 404) throw e;
    }

    // Prepare the content: Wrap in a React component if it's just raw JSX
    let formattedCode = code.trim();
    const hasFunction = /function|const\s+\w+\s*=\s*(async\s*)?\([^)]*\)\s*=>/i.test(formattedCode) || /export\s+default/i.test(formattedCode);
    
    if (!hasFunction) {
      const componentName = title.replace(/[^a-zA-Z0-9]/g, '');
      const validName = componentName.charAt(0).toUpperCase() + componentName.slice(1) || 'Component';
      
      formattedCode = `import React from 'react';

export default function ${validName}() {
  return (
    ${formattedCode}
  );
}`;
    }

    // 2. Create or Update the file
    await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: `Sync component: ${title} (${elementId})`,
      content: Buffer.from(formattedCode).toString('base64'),
      sha,
    });

    return NextResponse.json({ 
      success: true, 
      url: `https://github.com/${owner}/${repo}/blob/main/${path}` 
    });
  } catch (error: any) {
    console.error('GitHub Sync Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
