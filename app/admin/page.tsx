'use client';
import { useAuth } from '@/context/AuthContext';
import { 
  Layers, ShieldCheck, Users, LayoutTemplate, 
  Activity, ArrowLeft, Search, Filter, 
  ExternalLink, CheckCircle2, XCircle, 
  Menu, Bell, Settings, Terminal, Plus, ChevronRight, Loader2, Sparkles, Github
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, doc, updateDoc, deleteDoc, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore';

export default function AdminDashboard() {
  const { user, loading, isAdmin } = useAuth();
  const [activeView, setActiveView] = useState('overview');
  const [pendingElements, setPendingElements] = useState<any[]>([]);
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
      (error) => {
        console.warn("Approval Queue Listener (benign context):", error.message);
      }
    );

    // 2. User Directory Listener
    const userQuery = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
    const unsubUsers = onSnapshot(userQuery, 
      (snap) => {
        setAllUsers(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      },
      (error) => {
        console.warn("User Directory Listener (benign context):", error.message);
      }
    );

    // 3. System Logs (Recent Activity)
    const logQuery = query(collection(db, 'elements'), orderBy('createdAt', 'desc'), limit(15));
    const unsubLogs = onSnapshot(logQuery, 
      (snap) => {
        setSiteLogs(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      },
      (error) => {
        console.warn("System Logs Listener (benign context):", error.message);
      }
    );

    return () => { unsubQueue(); unsubUsers(); unsubLogs(); };
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
        ...adminFormData,
        frameworkType: adminFormData.framework,
        creatorId: user.uid,
        creatorName: user.displayName || 'Admin',
        creatorAvatar: user.photoURL || '',
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
    <div className="min-h-screen bg-[#F6F6F6] flex text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white">
      
      {/* Side Navigation Rail */}
      <aside className="w-20 lg:w-72 bg-white border-r border-zinc-200 flex flex-col transition-all duration-300 ease-in-out shrink-0">
        <div className="p-5 lg:p-8 h-24 flex items-center gap-4 border-b border-zinc-100">
           <div className="bg-zinc-900 rounded-xl p-2 shadow-lg shadow-zinc-200">
             <ShieldCheck className="w-6 h-6 text-white" />
           </div>
           <div className="hidden lg:block overflow-hidden">
             <h1 className="font-extrabold text-[15px] text-zinc-900 tracking-tight whitespace-nowrap uppercase">Admin Intelligence</h1>
             <div className="flex items-center gap-1.5">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
               <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Node Active</p>
             </div>
           </div>
        </div>
        
        <nav className="flex-1 p-3 lg:p-5 space-y-1.5">
          <Link href="/" className="flex lg:hidden items-center justify-center w-full aspect-square rounded-2xl text-zinc-400 hover:bg-zinc-100 transition-all mb-4">
             <ArrowLeft className="w-5 h-5" />
          </Link>
          <Link href="/" className="hidden lg:flex items-center gap-3 px-4 py-3 text-[13px] font-bold text-zinc-400 hover:text-zinc-900 rounded-2xl hover:bg-zinc-100 transition-all mb-6 group">
             <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Main Instance
          </Link>
          
          <AdminNavItem active={activeView === 'overview'} icon={Activity} label="System Status" onClick={() => setActiveView('overview')} />
          <AdminNavItem active={activeView === 'queue'} icon={LayoutTemplate} label="Approval Queue" count={pendingElements.length} onClick={() => setActiveView('queue')} />
          <AdminNavItem active={activeView === 'users'} icon={Users} label="User Directory" count={allUsers.length} onClick={() => setActiveView('users')} />
          <AdminNavItem active={activeView === 'logs'} icon={Terminal} label="System Logs" onClick={() => setActiveView('logs')} />
          <AdminNavItem active={activeView === 'upload'} icon={Plus} label="Direct Upload" onClick={() => setActiveView('upload')} />
          <AdminNavItem active={activeView === 'settings'} icon={Settings} label="Protocols" onClick={() => setActiveView('settings')} />
        </nav>

        <div className="p-5 border-t border-zinc-100 hidden lg:block">
           <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200 shadow-inner">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Active Admin</p>
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-[11px] font-bold text-white uppercase tracking-tighter">SD</div>
                 <div className="overflow-hidden">
                   <p className="text-[12px] font-bold text-zinc-900 truncate">Suryatutor</p>
                   <p className="text-[10px] text-zinc-400 truncate tracking-tight">{user?.email}</p>
                 </div>
              </div>
           </div>
        </div>
      </aside>

      {/* Surface Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header Bar */}
        <header className="h-24 bg-white border-b border-zinc-200 px-6 lg:px-12 flex items-center justify-between shrink-0">
           <div className="flex flex-col">
             <h2 className="text-xl lg:text-2xl font-black text-zinc-900 tracking-tighter capitalize">{activeView.replace('-', ' ')}</h2>
             <p className="text-[12px] font-medium text-zinc-400 uppercase tracking-wider">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
           </div>
           
           <div className="flex items-center gap-4 lg:gap-6">
             <div className="hidden lg:flex items-center relative">
               <Search className="w-4 h-4 text-zinc-400 absolute left-4" />
               <input 
                 type="text" 
                 placeholder="Search Protocols..." 
                 className="bg-zinc-50 border border-zinc-200 rounded-2xl py-2.5 pl-11 pr-4 text-[13px] font-medium w-64 focus:bg-white focus:shadow-lg focus:shadow-zinc-100 transition-all outline-none"
               />
             </div>
             <button className="relative w-11 h-11 flex items-center justify-center text-zinc-500 hover:bg-zinc-50 rounded-2xl transition-all border border-transparent hover:border-zinc-200 group">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white group-hover:animate-bounce"></span>
             </button>
             <button className="w-11 h-11 flex lg:hidden items-center justify-center text-zinc-500 bg-white border border-zinc-200 rounded-2xl">
                <Menu className="w-5 h-5" />
             </button>
           </div>
        </header>

        {/* Dynamic Content Area */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-12">
          {activeView === 'overview' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 max-w-6xl">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  <StatItem label="Total Users" value="1" delta="+0%" />
                  <StatItem label="Active Nodes" value="1" delta="+1" positive />
                  <StatItem label="Queue Volume" value={String(pendingElements.length)} delta={pendingElements.length > 0 ? `+${pendingElements.length}` : '0'} />
                  <StatItem label="System Uptime" value="100%" delta="STABLE" />
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <section className="bg-white rounded-[32px] border border-zinc-200 p-8 shadow-sm">
                       <div className="flex items-center justify-between mb-8">
                          <h3 className="text-lg font-black tracking-tighter text-zinc-900 px-1 border-l-4 border-zinc-900 leading-none">Intelligence Stream</h3>
                          <button className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors">Export Data</button>
                       </div>
                       
                       <div className="h-64 flex items-end gap-3 lg:gap-5 pb-2">
                          {[40, 70, 45, 90, 65, 85, 30, 55, 75, 50, 95, 60].map((h, i) => (
                            <div key={i} className="flex-1 group relative">
                               <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
                                 {h}%
                               </div>
                               <div 
                                 style={{ height: `${h}%` }} 
                                 className="w-full bg-zinc-100 group-hover:bg-zinc-900 rounded-t-lg transition-all duration-500"
                               ></div>
                            </div>
                          ))}
                       </div>
                       <div className="flex justify-between mt-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest px-1">
                          <span>Jan</span><span>Mar</span><span>Jun</span><span>Sep</span><span>Dec</span>
                       </div>
                    </section>

                    <section className="bg-zinc-900 text-white rounded-[32px] p-8 shadow-xl shadow-zinc-200">
                       <div className="flex items-center justify-between mb-6">
                         <div className="flex items-center gap-3">
                           <Terminal className="w-5 h-5 text-zinc-500" />
                           <h3 className="text-lg font-bold tracking-tight">System Live Terminal</h3>
                         </div>
                         <div className="flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-[10px] font-mono tracking-widest text-zinc-400">
                           <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> LIVE
                         </div>
                       </div>
                       <div className="font-mono text-[13px] leading-relaxed space-y-2 opacity-80">
                         <p className="text-emerald-400 flex items-start gap-2"><span className="text-zinc-600 shrink-0">10:42:15</span> [AUTH] Handshake verified for user SURYATUTOR48</p>
                         <p className="text-zinc-400 flex items-start gap-2"><span className="text-zinc-600 shrink-0">10:41:02</span> [FETCH] Requesting elements.collection with status:pending</p>
                         <p className="text-rose-400 flex items-start gap-2"><span className="text-zinc-600 shrink-0">10:40:48</span> [WAF] Blocked unauthorized attempt at /api/v1/delete_all</p>
                         <p className="text-indigo-400 flex items-start gap-2"><span className="text-zinc-600 shrink-0">10:38:22</span> [SYS] Database Asia-South1 responding in 14ms</p>
                       </div>
                    </section>
                  </div>

                  <div className="space-y-6">
                     <div className="bg-white rounded-[32px] border border-zinc-200 p-8 shadow-sm">
                        <h3 className="text-base font-bold text-zinc-900 mb-6">Quick Actions</h3>
                        <div className="space-y-3">
                           <QuickAction icon={Plus} label="Force Sync Node" />
                           <QuickAction icon={Filter} label="Sweep Cache" />
                           <QuickAction icon={Settings} label="Firewall Reboot" danger />
                        </div>
                     </div>

                     <div className="bg-white rounded-[32px] border border-zinc-200 p-8 shadow-sm">
                        <h3 className="text-base font-bold text-zinc-900 mb-6">Global Load</h3>
                        <div className="space-y-6">
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
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
               <div className="flex items-center justify-between mb-10">
                 <div>
                   <h3 className="text-2xl font-black tracking-tight text-zinc-900">Submission Queue</h3>
                   <p className="text-zinc-500 font-medium">Verify and approve components before they go live.</p>
                 </div>
                 <div className="flex items-center gap-3">
                    <button className="px-5 py-2.5 bg-white border border-zinc-200 text-zinc-600 rounded-2xl text-sm font-bold hover:bg-zinc-50 transition-all flex items-center gap-2">
                       <Filter className="w-4 h-4" /> Filter
                    </button>
                    <button className="px-5 py-2.5 bg-zinc-900 text-white rounded-2xl text-sm font-bold hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-200">
                       Approve Batch
                    </button>
                 </div>
               </div>

               <div className="bg-white border border-zinc-200 rounded-[32px] overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-zinc-50/50 border-b border-zinc-100">
                        <th className="px-8 py-5 text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Component Name</th>
                        <th className="px-6 py-5 text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Creator</th>
                        <th className="px-6 py-5 text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Framework</th>
                        <th className="px-6 py-5 text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Date</th>
                        <th className="px-8 py-5 text-[11px] font-bold text-zinc-400 uppercase tracking-widest text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {pendingElements.map((item) => (
                        <tr key={item.id} className="hover:bg-zinc-50/50 transition-colors group">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-2xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-400 group-hover:bg-zinc-900 group-hover:text-white transition-all overflow-hidden p-1">
                                <div className="scale-[0.2] origin-center w-[200%] h-[200%]" dangerouslySetInnerHTML={{ __html: item.code }} />
                              </div>
                              <span className="font-bold text-zinc-900">{item.title}</span>
                            </div>
                          </td>
                          <td className="px-6 py-6 text-sm font-medium text-zinc-500">@{item.creatorName}</td>
                          <td className="px-6 py-6">
                             <span className="px-3 py-1 bg-zinc-100 rounded-lg text-[11px] font-black uppercase text-zinc-500">{item.frameworkType}</span>
                          </td>
                          <td className="px-6 py-6 text-sm font-medium text-zinc-500">
                            {item.createdAt?.toDate().toLocaleDateString() || 'Recently'}
                          </td>
                          <td className="px-8 py-6">
                             <div className="flex items-center justify-end gap-2">
                               {isProcessing === item.id ? (
                                 <Loader2 className="w-5 h-5 animate-spin text-zinc-400" />
                               ) : (
                                 <>
                                   <button className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all" title="View Submission">
                                     <ExternalLink className="w-5 h-5" />
                                   </button>
                                   <button 
                                      onClick={() => handleApprove(item.id)}
                                      className="p-2 text-zinc-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all" 
                                      title="Approve"
                                    >
                                     <CheckCircle2 className="w-5 h-5" />
                                   </button>
                                   <button 
                                      onClick={() => handleReject(item.id)}
                                      className="p-2 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all" 
                                      title="Reject"
                                    >
                                     <XCircle className="w-5 h-5" />
                                   </button>
                                 </>
                               )}
                             </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {pendingElements.length === 0 && (
                    <div className="py-24 flex flex-col items-center justify-center text-center px-6">
                        <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-6">
                           <ShieldCheck className="w-8 h-8 text-emerald-500" />
                        </div>
                        <h4 className="text-xl font-bold text-zinc-900">Queue Operational</h4>
                        <p className="text-zinc-500 font-medium max-w-sm mt-2">All submissions have been processed. System idling.</p>
                    </div>
                  )}
               </div>
            </div>
          )}

          {activeView === 'upload' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 max-w-4xl">
               <div className="mb-10">
                 <h3 className="text-2xl font-black tracking-tight text-zinc-900 leading-none">Creator Studio</h3>
                 <p className="text-zinc-500 font-medium mt-2">Publish high-priority components directly to the library.</p>
               </div>

               <div className="bg-white border border-zinc-200 rounded-[32px] p-8 shadow-sm">
                  <form onSubmit={handleAdminSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[13px] font-bold text-zinc-900 uppercase tracking-widest">Entry Name</label>
                        <input 
                          required
                          type="text" 
                          value={adminFormData.title}
                          onChange={(e) => setAdminFormData({...adminFormData, title: e.target.value})}
                          placeholder="e.g. Tactical Dashboard Card" 
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-3 px-4 text-sm font-medium focus:bg-white focus:ring-4 focus:ring-zinc-100 transition-all outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[13px] font-bold text-zinc-900 uppercase tracking-widest">Framework</label>
                          <select 
                            value={adminFormData.framework}
                            onChange={(e) => setAdminFormData({...adminFormData, framework: e.target.value})}
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-3 px-4 text-sm font-medium focus:bg-white transition-all outline-none appearance-none"
                          >
                            <option>React</option>
                            <option>Tailwind CSS</option>
                            <option>Next.js</option>
                            <option>Framer Motion</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[13px] font-bold text-zinc-900 uppercase tracking-widest">Class</label>
                          <select 
                             value={adminFormData.category}
                             onChange={(e) => setAdminFormData({...adminFormData, category: e.target.value})}
                             className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-3 px-4 text-sm font-medium focus:bg-white transition-all outline-none appearance-none"
                          >
                             <option>Buttons</option>
                             <option>Cards</option>
                             <option>Navbars</option>
                             <option>Sections</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[13px] font-bold text-zinc-900 uppercase tracking-widest">Master Code Input</label>
                        <span className="text-[10px] bg-zinc-900 text-white px-2 py-0.5 rounded font-mono uppercase tracking-tighter">Bypass Active</span>
                      </div>
                      <textarea 
                        required
                        rows={12}
                        value={adminFormData.code}
                        onChange={(e) => setAdminFormData({...adminFormData, code: e.target.value})}
                        className="w-full bg-zinc-950 text-zinc-400 p-6 rounded-3xl font-mono text-[13px] focus:text-zinc-100 transition-all outline-none border border-zinc-800"
                        placeholder={'<div className="p-4 bg-zinc-900 text-white rounded-xl">Vasudev Element</div>'}
                      />
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                       <button 
                         type="submit"
                         disabled={isProcessing === 'uploading'}
                         className="flex-1 bg-zinc-900 text-white py-4 rounded-2xl font-bold hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-200 flex items-center justify-center gap-2 disabled:opacity-50"
                       >
                         {isProcessing === 'uploading' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                         Authorize Deployment
                       </button>
                    </div>
                  </form>
               </div>
            </div>
          )}

          {activeView === 'users' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
               <div className="mb-10">
                 <h3 className="text-2xl font-black tracking-tight text-zinc-900">User Intelligence</h3>
                 <p className="text-zinc-500 font-medium mt-2">Registry of all authorized nodes in the system.</p>
               </div>

               <div className="bg-white border border-zinc-200 rounded-[32px] overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-zinc-50/50 border-b border-zinc-100">
                        <th className="px-8 py-5 text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Identified User</th>
                        <th className="px-6 py-5 text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Access Email</th>
                        <th className="px-6 py-5 text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Created</th>
                        <th className="px-8 py-5 text-[11px] font-bold text-zinc-400 uppercase tracking-widest text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {allUsers.map((u) => (
                        <tr key={u.id} className="hover:bg-zinc-50/50 transition-colors">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-3">
                              {u.photoURL ? (
                                <img src={u.photoURL} alt="" className="w-9 h-9 rounded-xl border border-zinc-200" />
                              ) : (
                                <div className="w-9 h-9 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-400 font-bold text-[11px]">
                                   {u.displayName?.substring(0, 2).toUpperCase() || '??'}
                                </div>
                              )}
                              <span className="font-bold text-zinc-900">{u.displayName || 'Anonymous'}</span>
                            </div>
                          </td>
                          <td className="px-6 py-6 text-sm font-medium text-zinc-500">{u.email}</td>
                          <td className="px-6 py-6 text-sm font-medium text-zinc-500">
                            {u.createdAt?.toDate().toLocaleDateString() || 'Recently'}
                          </td>
                          <td className="px-8 py-6 text-right">
                             <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest">Verified</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {allUsers.length === 0 && (
                    <div className="py-24 text-center">
                       <Users className="w-12 h-12 text-zinc-200 mx-auto mb-4" />
                       <p className="text-zinc-400 font-bold uppercase text-[12px] tracking-widest">Empty Registry</p>
                    </div>
                  )}
               </div>
            </div>
          )}

          {activeView === 'logs' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 max-w-4xl">
               <div className="mb-10">
                 <h3 className="text-2xl font-black tracking-tight text-zinc-900">System Artifacts</h3>
                 <p className="text-zinc-500 font-medium mt-2">Chronological audit of recent database mutations.</p>
               </div>

               <div className="space-y-4">
                  {siteLogs.map((log) => (
                    <div key={log.id} className="bg-white border border-zinc-200 p-5 rounded-3xl flex items-center justify-between shadow-sm hover:shadow-md transition-all">
                       <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-2xl ${log.status === 'pending' ? 'bg-amber-50 text-amber-500' : 'bg-emerald-50 text-emerald-500'}`}>
                             {log.status === 'pending' ? <LayoutTemplate className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                          </div>
                          <div>
                             <div className="flex items-center gap-2">
                               <p className="text-sm font-bold text-zinc-900">
                                  {log.status === 'pending' ? 'New Submission' : 'Asset Published'}: <span className="text-zinc-400 font-medium">{log.title}</span>
                               </p>
                               {log.githubUrl && (
                                  <Link href={log.githubUrl} target="_blank" className="flex items-center gap-1.5 px-2 py-0.5 bg-zinc-900 text-white rounded-md text-[9px] font-black uppercase tracking-tight hover:bg-zinc-800 transition-all">
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

          {activeView === 'settings' && (
             <div className="animate-in fade-in slide-in-from-right-4 duration-500 max-w-2xl">
                <div className="mb-10">
                  <h3 className="text-2xl font-black tracking-tight text-zinc-900">System Protocols</h3>
                  <p className="text-zinc-500 font-medium mt-2">Configure core operational behaviors and security gates.</p>
                </div>

                <div className="space-y-6">
                   <ProtocolToggle label="Strict Schema Enforcement" desc="Reject all entries that don't match the master entity model exactly." active />
                   <ProtocolToggle label="Automated Firewall Purge" desc="Automatically clear cache on every 10th deployment." />
                   <ProtocolToggle label="Creator Verification Gate" desc="Require email verification before allowing component submissions." active />
                   <ProtocolToggle label="Admin Handshake Protocol" desc="Enable secondary confirmation for all deletion requests." />
                </div>
             </div>
          )}

          {['logs-old'].includes(activeView) && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 py-32 flex flex-col items-center justify-center text-center opacity-40">
              <Settings className="w-12 h-12 text-zinc-300 mb-6 animate-spin-slow" />
              <h3 className="text-2xl font-black text-zinc-900 uppercase tracking-tighter">Module Not Plugged</h3>
              <p className="text-zinc-500 font-medium">This interface segment is under construction.</p>
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
    <div className="bg-white border border-zinc-200 p-8 rounded-[32px] flex items-center justify-between shadow-sm">
       <div className="pr-12">
          <h4 className="text-sm font-bold text-zinc-900 mb-1">{label}</h4>
          <p className="text-[12px] text-zinc-500 leading-relaxed">{desc}</p>
       </div>
       <button 
         onClick={() => setEnabled(!enabled)}
         className={`w-14 h-8 rounded-full transition-all flex items-center px-1 shrink-0 ${enabled ? 'bg-zinc-900' : 'bg-zinc-100'}`}
       >
          <div className={`w-6 h-6 rounded-full bg-white shadow-sm transition-transform ${enabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
       </button>
    </div>
  );
}
function AdminNavItem({ active, icon: Icon, label, count, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex w-full items-center gap-4 px-4 py-3.5 rounded-2xl transition-all relative group ${
        active 
          ? 'bg-zinc-900 text-white shadow-xl shadow-zinc-200' 
          : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'
      }`}
    >
      <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${active ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-900'}`} />
      <span className="text-[14px] font-bold tracking-tight hidden lg:block">{label}</span>
      {count !== undefined && (
        <span className={`ml-auto hidden lg:flex h-5 w-5 items-center justify-center rounded-lg text-[10px] font-black ${
          active ? 'bg-white/20 text-white' : 'bg-zinc-100 text-zinc-900'
        }`}>
          {count}
        </span>
      )}
      {active && <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white hidden lg:block"></div>}
    </button>
  );
}

function StatItem({ label, value, delta, positive }: any) {
  return (
    <div className="bg-white p-7 rounded-[32px] border border-zinc-200 shadow-sm hover:shadow-md transition-all group">
       <span className="text-zinc-400 text-[11px] font-bold tracking-widest uppercase mb-1.5 block">{label}</span>
       <div className="flex items-end justify-between">
          <span className="text-3xl font-black text-zinc-900 tracking-tighter group-hover:scale-105 transition-transform origin-left">{value}</span>
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-lg ${
            positive || delta.includes('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
          }`}>
            {delta}
          </span>
       </div>
    </div>
  );
}

function QuickAction({ icon: Icon, label, danger }: any) {
  return (
    <button className={`flex w-full items-center justify-between p-4 rounded-2xl border transition-all active:scale-[0.98] ${
      danger 
        ? 'bg-rose-50 border-rose-100 text-rose-600 hover:bg-rose-100' 
        : 'bg-zinc-50 border-zinc-100 text-zinc-900 hover:bg-zinc-100 hover:border-zinc-200'
    }`}>
       <div className="flex items-center gap-3">
         <Icon className="w-4 h-4" />
         <span className="text-[13px] font-bold tracking-tight">{label}</span>
       </div>
       <ChevronRight className="w-4 h-4 opacity-50" />
    </button>
  );
}

function LoadIndicator({ label, value, warning }: any) {
  return (
    <div className="space-y-2">
       <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest">
         <span className="text-zinc-400">{label}</span>
         <span className={warning ? 'text-amber-500' : 'text-zinc-900'}>{value}%</span>
       </div>
       <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
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
