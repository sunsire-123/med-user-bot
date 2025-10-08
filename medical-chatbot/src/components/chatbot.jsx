import React from 'react';

// --- ALL CSS STYLES ARE DEFINED HERE (CLEANED) ---
const styles = `
:root {
    --body-bg: #F8F9FA;
    --chat-bg: #FFFFFF;
    --header-bg: #007BFF;
    --header-text: #FFFFFF;
    --ai-bubble-bg: #E9ECEF;
    --ai-bubble-text: #212529;
    --user-bubble-bg: #007BFF;
    --user-bubble-text: #FFFFFF;
    --input-bg: #F1F3F5;
    --text-color: #212529;
    --border-color: #DEE2E6;
    --shadow-color: rgba(0, 0, 0, 0.1);
}

body {
    background-color: var(--body-bg);
    display: flex;
    place-items: center;
    min-height: 100vh;
    margin: 0;
}

.chat-container {
    width: 100%;
    max-width: 600px;
    height: 85vh;
    max-height: 800px;
    background-color: var(--chat-bg);
    border-radius: 16px;
    box-shadow: 0 8px 30px var(--shadow-color);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid var(--border-color);
    font-family: 'Inter', sans-serif;
}

.chat-header {
    background-color: var(--header-bg);
    color: var(--header-text);
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
}
.header-left { display: flex; align-items: center; }
.header-left i { font-size: 24px; margin-right: 12px; }
.header-title h3 { margin: 0; font-size: 1.1em; }
.header-title span { font-size: 0.8em; opacity: 0.9; }
.status-indicator {
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: #28a745;
    border-radius: 50%;
    margin-right: 5px;
}
#language-select {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: none;
    padding: 5px 8px;
    border-radius: 6px;
    font-size: 0.8em;
}

.chat-box {
    flex-grow: 1;
    padding: 20px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.message {
    display: flex;
    align-items: flex-end;
    gap: 10px;
    max-width: 80%;
}

.message-content {
    padding: 12px 16px;
    border-radius: 18px;
    line-height: 1.5;
    word-wrap: break-word;
}

.avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
}

.ai-message { align-self: flex-start; }
.ai-message .message-content {
    background-color: var(--ai-bubble-bg);
    color: var(--ai-bubble-text);
    border-bottom-left-radius: 4px;
}
.ai-avatar { background-color: var(--ai-bubble-bg); color: #495057; }

.user-message { align-self: flex-end; }
.user-message .message-content {
    background-color: var(--user-bubble-bg);
    color: var(--user-bubble-text);
    border-bottom-right-radius: 4px;
}
.user-avatar { background-color: var(--user-bubble-bg); color: var(--user-bubble-text); }
.user-message .message-content { order: 1; }
.user-message .avatar { order: 2; }


.chat-input-area {
    padding: 15px 20px;
    border-top: 1px solid var(--border-color);
    display: flex;
    gap: 10px;
    background-color: var(--chat-bg);
    flex-shrink: 0;
}
.chat-input-area input {
    flex-grow: 1;
    border: none;
    background-color: var(--input-bg);
    padding: 12px 15px;
    border-radius: 20px;
    font-size: 1em;
    outline-color: var(--user-bubble-bg);
}
.send-btn {
    background-color: var(--user-bubble-bg);
    color: var(--user-bubble-text);
    border: none;
    padding: 12px 20px;
    border-radius: 20px;
    font-size: 1em;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
}
.send-btn:hover {
    background-color: #0056b3;
}
`;

// --- REACT COMPONENT ---
const Chatbot = () => {
    return (
        <>
            {/* This style tag injects all the CSS above into the page */}
            <style>{styles}</style>

            <div className="chat-container">
                <div className="chat-header">
                    <div className="header-left">
                        <i className="fa-solid fa-robot"></i>
                        <div className="header-title">
                            <h3>Medical Assistant</h3>
                            <span className="status-indicator"></span> Online
                        </div>
                    </div>
                    <div className="header-right">
                        <select name="language" id="language-select">
                            <option value="english">English</option>
                            <option value="spanish">Español</option>
                        </select>
                    </div>
                </div>
                <div className="chat-box">
                    <div className="message ai-message">
                        <div className="avatar ai-avatar"><i className="fa-solid fa-robot"></i></div>
                        <div className="message-content">Hello! How can I help you today?</div>
                    </div>
                    <div className="message user-message">
                        <div className="message-content">I have fever pls help me</div>
                        <div className="avatar user-avatar"><i className="fa-solid fa-user"></i></div>
                    </div>
                    <div className="message ai-message">
                        <div className="avatar ai-avatar"><i className="fa-solid fa-robot"></i></div>
                        <div className="message-content">I'm sorry to hear you're feeling unwell...</div>
                    </div>
                </div>
                <div className="chat-input-area">
                    <input type="text" placeholder="Type your message..." />
                    <button className="send-btn">
                        Send <i className="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Chatbot;
