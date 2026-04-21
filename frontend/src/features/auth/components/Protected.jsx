import { useSelector } from "react-redux"
import { Navigate } from "react-router"
const Protected = ({children}) => {

    const {user,loading}=useSelector((state)=>state.auth)


    if (loading) {
        return (
            <div className="initial-loader-wrapper">
                <div className="boot-container">
                    <div className="boot-header">
                        <div className="boot-logo">
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>all_inclusive</span>
                        </div>
                        <div className="boot-title">Initializing System</div>
                    </div>
                    <div className="boot-list">
                        <div className="boot-item">
                            <div className="boot-icon"><span className="material-symbols-outlined" style={{ fontSize: '18px' }}>forum</span></div>
                            <div className="boot-text">
                                <span className="boot-label">AI Chat Engine</span>
                                <span className="boot-desc">Ready for natural conversations</span>
                            </div>
                        </div>
                        <div className="boot-item">
                            <div className="boot-icon"><span className="material-symbols-outlined" style={{ fontSize: '18px' }}>language</span></div>
                            <div className="boot-text">
                                <span className="boot-label">Live Web Search</span>
                                <span className="boot-desc">Connecting to real-time internet data</span>
                            </div>
                        </div>
                        <div className="boot-item">
                            <div className="boot-icon"><span className="material-symbols-outlined" style={{ fontSize: '18px' }}>travel_explore</span></div>
                            <div className="boot-text">
                                <span className="boot-label">Deep Search</span>
                                <span className="boot-desc">Enabling advanced topic analysis</span>
                            </div>
                        </div>
                        <div className="boot-item">
                            <div className="boot-icon"><span className="material-symbols-outlined" style={{ fontSize: '18px' }}>upload_file</span></div>
                            <div className="boot-text">
                                <span className="boot-label">File Contexting</span>
                                <span className="boot-desc">Loading RAG and PDF capabilities</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if(!user){
        return <Navigate to='/login' />
    }

  return (
    <>
      {children}
    </>
  )
}

export default Protected
