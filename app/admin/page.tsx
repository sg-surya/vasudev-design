'use client';
import { useAuth } from '@/context/AuthContext';
import { 
  Layers, ShieldCheck, Users, LayoutTemplate, 
  Activity, ArrowLeft, Search, Filter, 
  ExternalLink, CheckCircle2, XCircle, 
  Menu, Bell, Settings, Terminal, Plus, ChevronRight, Loader2, Sparkles, Github, Database, Trash2
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { db, handleFirestoreError } from '@/lib/firebase';
import { collection, query, where, onSnapshot, doc, updateDoc, deleteDoc, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore';

export default function AdminDashboard() {
  const { user, loading, isAdmin } = useAuth();
  const [activeView, setActiveView] = useState('overview');
  const [pendingElements, setPendingElements] = useState<any[]>([]);
  const [libraryElements, setLibraryElements] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [siteLogs, setSiteLogs] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  
  // Admin Upload Form State
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [adminFormData, setAdminFormData] = useState({
    title: '', framework: 'React', category: 'Buttons', code: '', status: 'published'
  });

  useEffect(() => {
    if (!isAdmin) return;

    // 1. Approval Queue Listener
    const queueQuery = query(
      collection(db, 'elements'), 
      where('status', '==', 'pending'),
      orderBy('createdAt', 'desc')
    );
    const unsubQueue = onSnapshot(queueQuery, 
      (snap) => {
        setPendingElements(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      },
      (error) => handleFirestoreError(error, 'list', 'elements/pending')
    );

    // 1.5 Library Listener (Published Elements)
    const libraryQuery = query(
      collection(db, 'elements'), 
      where('status', '==', 'published'),
      orderBy('createdAt', 'desc')
    );
    const unsubLibrary = onSnapshot(libraryQuery, 
      (snap) => {
        setLibraryElements(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      },
      (error) => handleFirestoreError(error, 'list', 'elements/published')
    );

    // 2. User Directory Listener
    const userQuery = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
    const unsubUsers = onSnapshot(userQuery, 
      (snap) => setAllUsers(snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))),
      (error) => handleFirestoreError(error, 'list', 'users')
    );

    // 3. System Logs (Recent Activity)
    const logQuery = query(collection(db, 'elements'), orderBy('createdAt', 'desc'), limit(15));
    const unsubLogs = onSnapshot(logQuery, 
      (snap) => setSiteLogs(snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))),
      (error) => handleFirestoreError(error, 'list', 'elements/logs')
    );

    return () => { unsubQueue(); unsubLibrary(); unsubUsers(); unsubLogs(); };
  }, [isAdmin]);

  const syncToGithub = async (elementId: string, title: string, code: string, framework: string) => {
    try {
      const response = await fetch('/api/github-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ elementId, title, code, framework }),
      });
      const data = await response.json();
      if (data.success) {
        await updateDoc(doc(db, 'elements', elementId), {
          githubUrl: data.url,
          syncedAt: serverTimestamp()
        });
        return data.url;
      }
    } catch (err) {
      console.error('GitHub Sync failed:', err);
    }
    return null;
  };

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsProcessing('uploading');
    try {
      const docRef = await addDoc(collection(db, 'elements'), {
        title: adminFormData.title,
        frameworkType: adminFormData.framework,
        category: adminFormData.category,
        code: adminFormData.code,
        creatorId: user.uid,
        creatorName: user.displayName || 'Admin',
        creatorAvatar: user.photoURL || '',
        status: 'published', // Direct admin uploads are auto-published
        likesCount: 0,
        tags: [adminFormData.category.toLowerCase(), adminFormData.framework.toLowerCase()],
        createdAt: serverTimestamp(),
      });
      
      // Auto-sync to GitHub
      await syncToGithub(docRef.id, adminFormData.title, adminFormData.code, adminFormData.framework);
      
      setShowUploadModal(false);
      setAdminFormData({ title: '', framework: 'React', category: 'Buttons', code: '', status: 'published' });
      alert("Component Published & Synced to GitHub!");
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    } finally { setIsProcessing(null); }
  };

  const handleApprove = async (id: string) => {
    setIsProcessing(id);
    try {
      const element = pendingElements.find(e => e.id === id);
      await updateDoc(doc(db, 'elements', id), {
        status: 'published',
        publishedAt: serverTimestamp(),
      });
      
      // Sync to GitHub on approval
      if (element) {
        await syncToGithub(id, element.title, element.code, element.frameworkType);
      }
    } catch (error) { console.error(error); } 
    finally { setIsProcessing(null); }
  };

  const handleReject = async (id: string) => {
    if (!confirm("Reject and delete this submission?")) return;
    setIsProcessing(id);
    try { await deleteDoc(doc(db, 'elements', id)); } 
    catch (error) { console.error(error); } 
    finally { setIsProcessing(null); }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F9F9]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-[3px] border-zinc-200 border-t-zinc-900 rounded-full animate-spin"></div>
        <p className="text-zinc-400 text-xs font-mono uppercase tracking-widest animate-pulse">Initializing System...</p>
      </div>
    </div>
  );

  if (!user || !isAdmin) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white p-6 text-center">
      <ShieldCheck className="w-12 h-12 text-zinc-700 mb-6" />
      <h1 className="text-xl font-bold tracking-tight mb-2">Access Restricted</h1>
      <p className="text-zinc-500 max-w-xs text-sm leading-relaxed">System protocols deny access for user account: <br/><span className="text-zinc-300 italic">{user?.email || 'Guest'}</span></p>
      <Link href="/" className="mt-8 text-xs font-bold uppercase tracking-widest border border-zinc-800 px-6 py-3 rounded-full hover:bg-zinc-900 transition-all">Emergency Exit</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafafa] flex text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white">
      
      {/* Side Navigation Rail */}
      <aside className="w-20 lg:w-64 bg-[#fafafa] border-r border-zinc-200/60 flex flex-col transition-all duration-300 ease-in-out shrink-0">
        <div className="px-6 h-16 mt-2 flex items-center mb-6">
           <div className="hidden lg:flex items-center gap-3">
             <div className="bg-zinc-900 rounded-lg p-2 shadow-sm">
               <ShieldCheck className="w-4 h-4 text-white" />
             </div>
             <div>
               <h1 className="font-semibold text-sm text-zinc-900 tracking-tight">Admin Console</h1>
               <div className="flex items-center gap-1.5 opacity-80 mt-0.5">
                 <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                 <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">Active</p>
               </div>
             </div>
           </div>
           
           <div className="flex lg:hidden w-full justify-center">
             <div className="bg-zinc-900 rounded-lg p-1.5 shadow-sm">
               <ShieldCheck className="w-5 h-5 text-white" />
             </div>
           </div>
        </div>
        
        <nav className="flex-1 px-3 space-y-1">
          <Link href="/" className="flex lg:hidden items-center justify-center w-full aspect-square rounded-xl text-zinc-500 hover:bg-zinc-100 transition-all mb-4">
             <ArrowLeft className="w-5 h-5" />
          </Link>
          <Link href="/" className="hidden lg:flex items-center gap-3 px-3 py-2.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 rounded-xl hover:bg-zinc-100 transition-all mb-6 group">
             <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> Back to Platform
          </Link>
          
          <AdminNavItem active={activeView === 'overview'} icon={Activity} label="Overview" onClick={() => setActiveView('overview')} />
          <AdminNavItem active={activeView === 'library'} icon={Database} label="Library" count={libraryElements.length} onClick={() => setActiveView('library')} />
          <AdminNavItem active={activeView === 'queue'} icon={LayoutTemplate} label="Queue" count={pendingElements.length} onClick={() => setActiveView('queue')} />
          <AdminNavItem active={activeView === 'users'} icon={Users} label="Users" count={allUsers.length} onClick={() => setActiveView('users')} />
          <AdminNavItem active={activeView === 'logs'} icon={Terminal} label="Logs" onClick={() => setActiveView('logs')} />
          <AdminNavItem active={activeView === 'upload'} icon={Plus} label="Upload" onClick={() => setActiveView('upload')} />
          <AdminNavItem active={activeView === 'protocols'} icon={ShieldCheck} label="Settings" onClick={() => setActiveView('protocols')} />
        </nav>

        <div className="p-3 hidden lg:block">
           <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-100/80 transition-colors cursor-pointer group">
              <img src={user?.photoURL || `https://api.dicebear.com/9.x/avataaars/svg?seed=Admin`} alt="Admin" className="w-7 h-7 rounded-full shadow-sm ring-2 ring-white" />
              <div className="overflow-hidden flex-1">
                <p className="text-[13px] font-semibold text-zinc-900 truncate">Suryatutor</p>
                <p className="text-[10px] text-zinc-500 truncate">{user?.email}</p>
              </div>
           </div>
        </div>
      </aside>

      {/* Surface Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-white border-l border-t border-zinc-200/60 shadow-sm mt-0 ml-0 mb-0 lg:mt-2 lg:ml-0 lg:mb-2 lg:mr-2 lg:rounded-2xl lg:h-[calc(100vh-16px)]">
        {/* Top Header Bar */}
        <header className="h-16 px-6 lg:px-8 border-b border-zinc-100 flex items-center justify-between shrink-0">
           <div className="flex flex-col">
             <h2 className="text-xl font-bold text-zinc-900 tracking-tight capitalize">{activeView.replace('-', ' ')}</h2>
           </div>
           
           <div className="flex items-center gap-4 hidden lg:flex bg-[#1e293b] rounded-full px-4 py-2 w-80 shadow-lg focus-within:ring-2 focus-within:ring-zinc-400 transition-all duration-300">
             <input
               type="text"
               placeholder="Search something..."
               className="bg-transparent outline-none text-white placeholder-zinc-400 flex-1 text-sm font-medium"
             />
             <button className="ml-2 bg-indigo-500 hover:bg-indigo-600 p-[7px] rounded-full transition-all duration-300 shrink-0 shadow-sm flex items-center justify-center">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.85-5.65a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
               </svg>
             </button>
           </div>
           
           <div className="flex items-center gap-4">
             <button className="w-9 h-9 flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-all relative">
                <Bell className="w-4 h-4" />
                <span className="absolute top-2.5 right-2 w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
             </button>
             <button className="w-9 h-9 flex lg:hidden items-center justify-center text-zinc-500 bg-zinc-50 border border-zinc-200 rounded-lg">
                <Menu className="w-4 h-4" />
             </button>
           </div>
        </header>

        {/* Dynamic Content Area */}
        <div className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 lg:py-8 custom-scrollbar">
          {activeView === 'overview' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 max-w-6xl mx-auto">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <StatItem label="Total Users" value={allUsers.length.toString()} delta={`+${allUsers.length > 0 ? "100" : "0"}%`} positive={allUsers.length > 0} />
                  <StatItem label="Active Nodes" value={libraryElements.length.toString()} delta={`+${libraryElements.length}`} positive />
                  <StatItem label="Queue Volume" value={String(pendingElements.length)} delta={pendingElements.length > 0 ? `+${pendingElements.length}` : '0'} />
                  <StatItem label="System Uptime" value="100%" delta="STABLE" positive />
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <section className="bg-white rounded-2xl border border-zinc-200/60 p-6 shadow-sm">
                       <div className="flex items-center justify-between mb-6">
                          <h3 className="text-base font-semibold tracking-tight text-zinc-900 border-l-2 pl-2 border-zinc-900 leading-none">Intelligence Stream</h3>
                          <button className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors">Export Data</button>
                       </div>
                       
                       <div className="h-56 flex items-end gap-2 lg:gap-4 pb-2">
                          {[40, 70, 45, 90, 65, 85, 30, 55, 75, 50, 95, 60].map((h, i) => (
                            <div key={i} className="flex-1 group relative">
                               <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-zinc-800 text-white text-[10px] font-semibold px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
                                 {h}%
                               </div>
                               <div 
                                 style={{ height: `${h}%` }} 
                                 className="w-full bg-zinc-100 group-hover:bg-zinc-800 rounded-t border-t border-zinc-200/50 group-hover:border-transparent transition-all duration-300"
                               ></div>
                            </div>
                          ))}
                       </div>
                       <div className="flex justify-between mt-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest px-1">
                          <span>Jan</span><span>Mar</span><span>Jun</span><span>Sep</span><span>Dec</span>
                       </div>
                    </section>

                    <section className="bg-zinc-900 text-white rounded-2xl p-6 shadow-sm">
                       <div className="flex items-center justify-between mb-5">
                         <div className="flex items-center gap-2">
                           <Terminal className="w-4 h-4 text-zinc-500" />
                           <h3 className="text-sm font-semibold tracking-tight">System Live Terminal</h3>
                         </div>
                         <div className="flex items-center gap-1.5 px-2 py-0.5 bg-white/10 rounded-md text-[10px] font-mono tracking-widest text-zinc-400">
                           <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> LIVE
                         </div>
                       </div>
                       <div className="font-mono text-xs leading-relaxed space-y-1.5 opacity-80">
                         <p className="text-emerald-400 flex items-start gap-2"><span className="text-zinc-500 shrink-0">10:42:15</span> [AUTH] Handshake verified for admin session</p>
                         <p className="text-zinc-400 flex items-start gap-2"><span className="text-zinc-500 shrink-0">10:41:02</span> [FETCH] Requesting elements.collection with status:pending</p>
                         <p className="text-rose-400 flex items-start gap-2"><span className="text-zinc-500 shrink-0">10:40:48</span> [WAF] Blocked unauthorized attempt at /api/v1/delete_all</p>
                         <p className="text-indigo-400 flex items-start gap-2"><span className="text-zinc-500 shrink-0">10:38:22</span> [SYS] Database Asia-South1 responding in 14ms</p>
                       </div>
                    </section>
                  </div>

                  <div className="space-y-6">
                     <div className="bg-white rounded-2xl border border-zinc-200/60 p-6 shadow-sm">
                        <h3 className="text-sm font-semibold text-zinc-900 mb-4">Quick Actions</h3>
                        <div className="space-y-2">
                           <QuickAction icon={Plus} label="Force Sync Node" />
                           <QuickAction icon={Filter} label="Sweep Cache" />
                           <QuickAction icon={Settings} label="Firewall Reboot" danger />
                        </div>
                     </div>

                     <div className="bg-white rounded-2xl border border-zinc-200/60 p-6 shadow-sm">
                        <h3 className="text-sm font-semibold text-zinc-900 mb-4">Global Load</h3>
                        <div className="space-y-5">
                           <LoadIndicator label="Database IO" value={65} />
                           <LoadIndicator label="Auth Traffic" value={22} />
                           <LoadIndicator label="Worker Threads" value={88} warning />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {activeView === 'queue' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 max-w-7xl mx-auto">
               <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
                 <div>
                   <h3 className="text-2xl font-semibold tracking-tight text-zinc-900">Approval Queue</h3>
                   <p className="text-zinc-500 text-sm mt-1">Review and approve community submissions before publishing.</p>
                 </div>
               </div>

               <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-zinc-200 bg-zinc-50/50">
                          <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Component</th>
                          <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Creator</th>
                          <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Framework</th>
                          <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100">
                        {pendingElements.map((item) => (
                          <tr key={item.id} className="hover:bg-zinc-50/80 transition-colors group">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-300">
                                   <LayoutTemplate className="w-5 h-5" />
                                </div>
                                <div>
                                  <span className="font-semibold text-zinc-900 block">{item.title}</span>
                                  <span className="text-xs text-zinc-500">
                                    {item.createdAt?.toDate().toLocaleDateString() || 'Recently'}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                               <div className="flex items-center gap-3">
                                  <img src={item.creatorAvatar || `https://api.dicebear.com/9.x/avataaars/svg?seed=${item.creatorName}`} alt="" className="w-6 h-6 rounded-full" />
                                  <span className="text-sm font-medium text-zinc-700">@{item.creatorName}</span>
                               </div>
                            </td>
                            <td className="px-6 py-4">
                               <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-100 text-zinc-600 capitalize">
                                 {item.frameworkType}
                               </span>
                            </td>
                            <td className="px-6 py-4">
                               <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                 {isProcessing === item.id ? (
                                   <Loader2 className="w-5 h-5 animate-spin text-zinc-400" />
                                 ) : (
                                   <>
                                     <button className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="View Submission">
                                       <ExternalLink className="w-4 h-4" />
                                     </button>
                                     <button 
                                        onClick={() => handleApprove(item.id)}
                                        className="p-2 text-zinc-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" 
                                        title="Approve"
                                      >
                                       <CheckCircle2 className="w-4 h-4" />
                                     </button>
                                     <button 
                                        onClick={() => handleReject(item.id)}
                                        className="p-2 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" 
                                        title="Reject"
                                      >
                                       <XCircle className="w-4 h-4" />
                                     </button>
                                   </>
                                 )}
                               </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {pendingElements.length === 0 && (
                    <div className="py-32 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-6">
                           <ShieldCheck className="w-8 h-8 text-emerald-500" />
                        </div>
                        <h4 className="text-lg font-semibold text-zinc-900">Queue Operational</h4>
                        <p className="text-zinc-500 text-sm max-w-sm mt-2">All submissions have been processed. System idling.</p>
                    </div>
                  )}
               </div>
            </div>
          )}

          {activeView === 'library' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 max-w-7xl mx-auto">
               <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
                 <div>
                   <h3 className="text-2xl font-semibold tracking-tight text-zinc-900">Library Registry</h3>
                   <p className="text-zinc-500 text-sm mt-1">Manage all live components available in the application.</p>
                 </div>
                 <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-white border border-zinc-200 text-zinc-700 rounded-lg text-sm font-medium hover:bg-zinc-50 hover:text-zinc-900 transition-colors shadow-sm flex items-center gap-2">
                       <Filter className="w-4 h-4" /> Filter
                    </button>
                 </div>
               </div>

               <div className="bg-white rounded-2xl border border-zinc-200/60 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-zinc-200/60 bg-zinc-50/50">
                          <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Component</th>
                          <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Creator</th>
                          <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Category</th>
                          <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100">
                        {libraryElements.map((item) => (
                          <tr key={item.id} className="hover:bg-zinc-50/80 transition-colors group">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-300">
                                   <LayoutTemplate className="w-5 h-5" />
                                </div>
                                <div>
                                  <span className="font-semibold text-zinc-900 block">{item.title}</span>
                                  <span className="text-xs text-zinc-500">{item.likesCount || 0} Likes</span>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                               <div className="flex items-center gap-3">
                                  <img src={item.creatorAvatar || `https://api.dicebear.com/9.x/avataaars/svg?seed=${item.creatorName}`} alt="" className="w-6 h-6 rounded-full" />
                                  <span className="text-sm font-medium text-zinc-700">@{item.creatorName}</span>
                               </div>
                            </td>
                            <td className="px-6 py-4">
                               <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-100 text-zinc-600 capitalize">
                                 {item.category}
                               </span>
                            </td>
                            <td className="px-6 py-4">
                               <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                 {isProcessing === item.id ? (
                                   <Loader2 className="w-5 h-5 animate-spin text-zinc-400" />
                                 ) : (
                                   <>
                                     <Link href={`/element/${item.id}`} className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="View Component">
                                       <ExternalLink className="w-4 h-4" />
                                     </Link>
                                     <button 
                                        onClick={() => handleReject(item.id)}
                                        className="p-2 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" 
                                        title="Delete Component"
                                      >
                                       <Trash2 className="w-4 h-4" />
                                     </button>
                                   </>
                                 )}
                               </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {libraryElements.length === 0 && (
                    <div className="py-32 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-6">
                           <Database className="w-8 h-8 text-zinc-300" />
                        </div>
                        <h4 className="text-lg font-semibold text-zinc-900">Library Empty</h4>
                        <p className="text-zinc-500 text-sm max-w-sm mt-2">No live components are available in the public registry.</p>
                    </div>
                  )}
               </div>
            </div>
          )}

          {activeView === 'upload' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 max-w-4xl mx-auto">
               <div className="mb-8">
                 <h3 className="text-2xl font-semibold tracking-tight text-zinc-900">Batch Upload</h3>
                 <p className="text-zinc-500 text-sm mt-1">Publish bulk component files directly from a directory structure (e.g. Buttons/component.html).</p>
               </div>

               <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-sm">
                  <div className="space-y-6">
                    
                    <div className="border-2 border-dashed border-zinc-200/60 rounded-xl p-10 text-center hover:bg-zinc-50 hover:border-zinc-300 transition-colors relative group">
                       <input 
                         type="file" 
                         // @ts-ignore
                         webkitdirectory="true" 
                         directory="true" 
                         multiple 
                         onChange={async (e) => {
                           const files = e.target.files;
                           if (!files || files.length === 0) return;
                           if (!user) { alert("Admin login required"); return; }
                           
                           setIsProcessing('uploading');
                           let uploaded = 0;
                           
                           try {
                             for (let i = 0; i < files.length; i++) {
                               const file = files[i];
                               if (!file.name.endsWith('.html')) continue;
                               
                               const pathParts = file.webkitRelativePath.split('/');
                               const category = pathParts.length > 2 ? pathParts[1] : 'Uncategorized';
                               const filename = pathParts[pathParts.length - 1].replace('.html', '');
                               
                               let title = filename;
                               let creator = "Community";
                               
                               if (filename.includes('_')) {
                                 const parts = filename.split('_');
                                 creator = parts[0];
                                 title = parts.slice(1).join(' ').replace(/-/g, ' ');
                               }

                               const text = await file.text();
                               
                               await addDoc(collection(db, 'elements'), {
                                 title: title.charAt(0).toUpperCase() + title.slice(1),
                                 frameworkType: 'HTML/CSS',
                                 category: category,
                                 code: text,
                                 creatorId: user.uid, // Admin who uploaded it
                                 creatorName: creator,
                                 creatorAvatar: `https://api.dicebear.com/9.x/avataaars/svg?seed=${creator}`,
                                 status: 'published',
                                 likesCount: Math.floor(Math.random() * 50),
                                 tags: [category.toLowerCase(), 'html', 'css'],
                                 createdAt: serverTimestamp(),
                               });
                               uploaded++;
                             }
                             alert(`Successfully processed and uploaded ${uploaded} HTML components!`);
                           } catch (err) {
                             console.error(err);
                             alert("Batch upload failed. Check console.");
                           } finally {
                             setIsProcessing(null);
                             // Reset input
                             e.target.value = '';
                           }
                         }}
                         className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                       />
                       <div className="flex justify-center mb-4">
                          <div className="w-12 h-12 bg-zinc-100/50 group-hover:bg-white rounded-xl flex items-center justify-center text-zinc-400 group-hover:text-zinc-600 border border-zinc-200/50 shadow-sm transition-all group-hover:scale-110 duration-300">
                             <Plus className="w-5 h-5" />
                          </div>
                       </div>
                       <h4 className="text-sm font-semibold text-zinc-900 mb-1.5">Click to select a Folder directory</h4>
                       <p className="text-zinc-500 text-xs max-w-sm mx-auto">
                         The system automatically extracts the Category from the subfolder and the Creator Name from the filename (e.g. <span className="font-mono text-[10px] bg-zinc-100 px-1 rounded text-zinc-700">username_component.html</span>).
                       </p>
                    </div>

                    {isProcessing === 'uploading' && (
                      <div className="flex items-center justify-center gap-2 p-3 bg-zinc-50 border border-zinc-200/50 text-zinc-700 rounded-lg font-medium text-xs tracking-wide">
                        <Loader2 className="w-4 h-4 animate-spin text-zinc-400" /> Processing Directory Structure...
                      </div>
                    )}
                  </div>
               </div>
            </div>
          )}

          {activeView === 'users' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 max-w-7xl mx-auto">
               <div className="mb-8">
                 <h3 className="text-2xl font-semibold tracking-tight text-zinc-900">User Intelligence</h3>
                 <p className="text-zinc-500 text-sm mt-1">Registry of all authorized nodes in the system.</p>
               </div>

               <div className="bg-white border border-zinc-200/60 rounded-2xl overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-zinc-50/50 border-b border-zinc-200">
                          <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Identified User</th>
                          <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Access Email</th>
                          <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Created</th>
                          <th className="whitespace-nowrap px-8 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100">
                        {allUsers.map((u) => (
                          <tr key={u.id} className="hover:bg-zinc-50/80 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                {u.photoURL ? (
                                  <img src={u.photoURL} alt="" className="w-8 h-8 rounded-full border border-zinc-200" />
                                ) : (
                                  <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 font-bold text-xs">
                                     {u.displayName?.substring(0, 2).toUpperCase() || '??'}
                                  </div>
                                )}
                                <span className="font-semibold text-zinc-900 block">{u.displayName || 'Anonymous'}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-zinc-500">{u.email}</td>
                            <td className="px-6 py-4 text-sm text-zinc-500">
                              {u.createdAt?.toDate().toLocaleDateString() || 'Recently'}
                            </td>
                            <td className="px-8 py-4 text-right">
                               <span className="inline-flex items-center px-2 py-1 bg-emerald-50 text-emerald-600 rounded-md text-[10px] font-bold uppercase tracking-widest border border-emerald-100">Verified</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {allUsers.length === 0 && (
                    <div className="py-24 text-center">
                       <Users className="w-10 h-10 text-zinc-200 mx-auto mb-4" />
                       <p className="text-zinc-500 text-sm font-medium">Empty Registry</p>
                    </div>
                  )}
               </div>
            </div>
          )}

          {activeView === 'logs' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 max-w-4xl mx-auto">
               <div className="mb-8">
                 <h3 className="text-2xl font-semibold tracking-tight text-zinc-900">System Artifacts</h3>
                 <p className="text-zinc-500 text-sm mt-1">Chronological audit of recent database mutations.</p>
               </div>

               <div className="space-y-4">
                  {siteLogs.map((log) => (
                    <div key={log.id} className="bg-white border border-zinc-200/60 p-4 rounded-xl flex items-center justify-between shadow-sm hover:shadow-md transition-all group">
                       <div className="flex items-center gap-4">
                          <div className={`p-2.5 rounded-lg border ${log.status === 'pending' ? 'bg-amber-50 text-amber-500 border-amber-100' : 'bg-emerald-50 text-emerald-500 border-emerald-100'}`}>
                             {log.status === 'pending' ? <LayoutTemplate className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                          </div>
                          <div>
                             <div className="flex items-center gap-2">
                               <p className="text-sm font-semibold text-zinc-900">
                                  {log.status === 'pending' ? 'New Submission' : 'Asset Published'}: <span className="text-zinc-500 font-medium">{log.title}</span>
                               </p>
                               {log.githubUrl && (
                                  <Link href={log.githubUrl} target="_blank" className="flex items-center gap-1.5 px-2 py-0.5 bg-zinc-100 text-zinc-600 border border-zinc-200 rounded text-[10px] font-bold uppercase tracking-tight hover:bg-zinc-200 transition-colors">
                                     <Github className="w-2.5 h-2.5" /> Synced
                                  </Link>
                               )}
                             </div>
                             <p className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider mt-0.5">
                                Origin: {log.creatorName} • {log.createdAt?.toDate().toLocaleString()}
                             </p>
                          </div>
                       </div>
                       <div className="text-right">
                          <div className="px-3 py-1 bg-zinc-50 rounded-lg text-[10px] font-black uppercase text-zinc-400 tracking-tighter">
                             {log.frameworkType}
                          </div>
                       </div>
                    </div>
                  ))}
                  {siteLogs.length === 0 && (
                     <div className="bg-zinc-50 border border-zinc-200 border-dashed rounded-[32px] py-32 text-center">
                        <Terminal className="w-12 h-12 text-zinc-200 mx-auto mb-4" />
                        <p className="text-zinc-400 font-bold uppercase text-[12px] tracking-widest">No Log Data Found</p>
                     </div>
                  )}
               </div>
            </div>
          )}

          {activeView === 'protocols' && (
             <div className="animate-in fade-in slide-in-from-right-4 duration-500 max-w-4xl mx-auto">
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold tracking-tight text-zinc-900">Security Protocols</h3>
                  <p className="text-zinc-500 text-sm mt-1">Manage restricted access and core system invariants.</p>
                </div>

                <div className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ProtocolToggle label="Strict Schema Enforcement" desc="Reject all entries that don't match the master entity model exactly." active />
                      <ProtocolToggle label="Automated Firewall Purge" desc="Automatically clear cache on every 10th deployment." />
                      <ProtocolToggle label="Creator Verification Gate" desc="Require email verification before allowing component submissions." active />
                      <ProtocolToggle label="Admin Handshake Protocol" desc="Enable secondary confirmation for all deletion requests." />
                   </div>

                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <ProtocolCluster title="Encryption Matrix">
                         <div className="space-y-3">
                            <ProtocolMetric label="SSL Handshake" status="Optimal" value={100} />
                            <ProtocolMetric label="Key Rotation" status="Routine (24h)" value={75} />
                            <ProtocolMetric label="WAF Guard" status="Active" value={100} active />
                         </div>
                      </ProtocolCluster>

                      <ProtocolCluster title="Access Control">
                         <div className="space-y-3">
                            <ProtocolMetric label="MFA Enforcement" status="Strict" value={100} />
                            <ProtocolMetric label="IP Whitelisting" status="Enabled" value={100} />
                            <ProtocolMetric label="Super Admin" status="Locked" value={100} active />
                         </div>
                      </ProtocolCluster>
                   </div>
                </div>
             </div>
          )}

          {['logs-old'].includes(activeView) && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 py-32 flex flex-col items-center justify-center text-center opacity-40">
              <Settings className="w-10 h-10 text-zinc-300 mb-4 animate-spin-slow" />
              <h3 className="text-lg font-semibold text-zinc-900 tracking-tight">Module Under Construction</h3>
              <p className="text-zinc-500 text-sm mt-1">This interface segment is not currently active.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function ProtocolToggle({ label, desc, active }: any) {
  const [enabled, setEnabled] = useState(active);
  return (
    <div className="bg-white border border-zinc-200/60 p-5 rounded-2xl flex flex-col justify-between hover:border-zinc-300 transition-colors">
       <div className="flex justify-between items-start mb-3">
          <div className="bg-zinc-50 p-1.5 rounded-lg border border-zinc-100">
             <ShieldCheck className={`w-4 h-4 ${enabled ? 'text-zinc-900' : 'text-zinc-400'}`} />
          </div>
          <button 
            onClick={() => setEnabled(!enabled)}
            className={`w-10 h-5 rounded-full transition-colors flex items-center px-0.5 shrink-0 ${enabled ? 'bg-zinc-900' : 'bg-zinc-200'}`}
          >
             <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${enabled ? 'translate-x-5' : 'translate-x-0'}`}></div>
          </button>
       </div>
       <div>
          <h4 className="text-sm font-semibold text-zinc-900">{label}</h4>
          <p className="text-xs text-zinc-500 leading-relaxed font-medium mt-1">{desc}</p>
       </div>
    </div>
  );
}

const ProtocolCluster = ({ title, children }: any) => (
  <div className="bg-[#fafafa] border border-zinc-200/50 rounded-2xl overflow-hidden shadow-sm">
     <div className="bg-zinc-50/50 px-5 py-3 border-b border-zinc-200/50 flex items-center justify-between">
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{title}</h4>
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
     </div>
     <div className="p-5 space-y-3">
        {children}
     </div>
  </div>
);

const ProtocolMetric = ({ label, status, value, active }: any) => (
  <div className="space-y-1.5">
     <div className="flex justify-between items-center">
        <span className="text-xs font-semibold text-zinc-700">{label}</span>
        <span className={`text-[10px] font-bold uppercase tracking-widest ${active ? 'text-emerald-500' : 'text-zinc-400'}`}>{status}</span>
     </div>
     <div className="h-1 bg-zinc-100 rounded-full overflow-hidden">
        <div 
          style={{ width: `${value}%` }} 
          className={`h-full rounded-full transition-all duration-1000 ${active ? 'bg-emerald-500' : 'bg-zinc-900'}`}
        ></div>
     </div>
  </div>
);

function AdminNavItem({ active, icon: Icon, label, count, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex w-full items-center gap-3 px-3 py-2 rounded-lg transition-colors relative group ${
        active 
          ? 'bg-zinc-100/80 text-zinc-900' 
          : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'
      }`}
    >
      <Icon className={`w-4 h-4 ml-1 ${active ? 'text-zinc-900' : 'text-zinc-400 group-hover:text-zinc-600'}`} />
      <span className="text-sm font-medium hidden lg:block">{label}</span>
      {count !== undefined && count > 0 && (
        <span className={`ml-auto hidden lg:flex h-5 px-1.5 min-w-[20px] items-center justify-center rounded-md text-[10px] font-bold ${
          active ? 'bg-white text-zinc-900 border border-zinc-200/60' : 'bg-zinc-100 text-zinc-500'
        }`}>
          {count}
        </span>
      )}
    </button>
  );
}

function StatItem({ label, value, delta, positive }: any) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-zinc-200/50 hover:shadow-lg transition-all hover:-translate-y-0.5">
       <span className="text-zinc-500 text-xs font-medium mb-2 block">{label}</span>
       <div className="flex items-end justify-between">
          <span className="text-2xl font-semibold text-zinc-900 tracking-tight">{value}</span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
            positive || delta.includes('+') ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-zinc-50 text-zinc-600 border border-zinc-200'
          }`}>
            {delta}
          </span>
       </div>
    </div>
  );
}

function QuickAction({ icon: Icon, label, danger }: any) {
  return (
    <button className={`flex w-full items-center justify-between p-2.5 rounded-lg border transition-colors shadow-sm ${
      danger 
        ? 'bg-white border-rose-100/50 text-rose-600 hover:bg-rose-50' 
        : 'bg-white border-zinc-200/50 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300'
    }`}>
       <div className="flex items-center gap-3">
         <Icon className="w-3.5 h-3.5 ml-1" />
         <span className="text-xs font-semibold">{label}</span>
       </div>
       <ChevronRight className="w-3.5 h-3.5 opacity-40 mr-1" />
    </button>
  );
}

function LoadIndicator({ label, value, warning }: any) {
  return (
    <div className="space-y-1.5">
       <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
         <span className="text-zinc-500">{label}</span>
         <span className={warning ? 'text-amber-500' : 'text-zinc-900'}>{value}%</span>
       </div>
       <div className="h-1 bg-zinc-100 rounded-full overflow-hidden">
         <div 
           style={{ width: `${value}%` }} 
           className={`h-full rounded-full transition-all duration-1000 ${
             warning ? 'bg-amber-500' : 'bg-zinc-900'
           }`}
         ></div>
       </div>
    </div>
  );
}
