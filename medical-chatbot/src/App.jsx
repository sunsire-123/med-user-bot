import React, { useState, useEffect, useRef } from 'react';

// --- Translation Data (No changes needed) ---
const translations = {
    en: {
        title: "Medical Assistant",
        status: "● Online",
        welcome: "Hello! I am your friendly AI healthcare assistant. How can I help you today?",
        placeholder: "Type your message...",
        send: "Send",
        heroTitle: "Your Personal Health Companion",
        heroSubtitle: "Get instant, helpful information about symptoms, vaccinations, and general health questions from our advanced AI. Please consult a doctor for medical advice."
    },
    hi: {
        title: "चिकित्सा सहायक",
        status: "● Online",
        welcome: "नमस्ते! मैं आपका एआई स्वास्थ्य सहायक हूँ। मैं आपकी कैसे मदद कर सकता हूँ?",
        placeholder: "अपना संदेश लिखें...",
        send: "भेजें",
        heroTitle: "आपका व्यक्तिगत स्वास्थ्य साथी",
        heroSubtitle: "हमारे उन्नत एआई से लक्षणों, टीकाकरण और सामान्य स्वास्थ्य प्रश्नों के बारे में तुरंत उपयोगी जानकारी प्राप्त करें। चिकित्सा सलाह के लिए कृपया डॉक्टर से परामर्श लें।"
    },
    ta: {
        title: "மருத்துவ உதவியாளர்",
        status: "● ஆன்லைனில்",
        welcome: "வணக்கம்! நான் உங்கள் ஏஐ சுகாதார உதவியாளர். நான் உங்களுக்கு எப்படி உதவ முடியும்?",
        placeholder: "உங்கள் செய்தியை தட்டச்சு செய்க...",
        send: "அனுப்பு",
        heroTitle: "உங்கள் தனிப்பட்ட சுகாதார துணை",
        heroSubtitle: "எங்கள் மேம்பட்ட AI மூலம் அறிகுறிகள், தடுப்பூசிகள் மற்றும் பொது சுகாதார கேள்விகள் பற்றிய உடனடி, பயனுள்ள தகவல்களைப் பெறுங்கள். மருத்துவ ஆலோசனைக்கு மருத்துவரை அணுகவும்."
    }
};

// --- API Helper Function (No changes needed) ---
async function getAIResponse(userMessage) {
    try {
        const response = await fetch('http://127.0.0.1:5000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMessage }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Network response was not ok');
        }
        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('Error fetching AI response:', error);
        return 'Sorry, I had trouble connecting to the server. Please check that the server is running.';
    }
}

// --- Message Component (Updated with hover effects) ---
const Message = ({ text, sender }) => {
    const isUser = sender === 'user';
    const baseClasses = 'max-w-md md:max-w-lg p-3 rounded-2xl mb-2 break-words animate-pop-in shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out';
    const userClasses = 'bg-gradient-to-br from-blue-600 to-blue-500 text-white self-end rounded-br-none';
    const botClasses = 'bg-gray-200 text-gray-800 self-start rounded-bl-none dark:bg-slate-700 dark:text-gray-200';
    return <div className={`${baseClasses} ${isUser ? userClasses : botClasses}`}>{text}</div>;
};

// --- Thinking Indicator Component (No changes needed) ---
const ThinkingIndicator = () => (
    <div className="animate-pop-in self-start">
        <div className="p-3 rounded-2xl mb-2 bg-gray-200 dark:bg-slate-700 shadow-md">
            <div className="flex items-center justify-center space-x-1.5">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulsate"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulsate animation-delay-200"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulsate animation-delay-400"></div>
            </div>
        </div>
    </div>
);

// --- Typing Effect Component (No changes needed) ---
const TypingEffect = ({ text, className }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const typingSpeed = 120;
    const deletingSpeed = 60;
    const pauseDuration = 2000;

    useEffect(() => {
        const handleTyping = () => {
            if (isDeleting) {
                if (displayedText.length > 0) {
                    setDisplayedText((prev) => prev.substring(0, prev.length - 1));
                } else {
                    setIsDeleting(false);
                }
            } else {
                if (displayedText.length < text.length) {
                    setDisplayedText((prev) => text.substring(0, prev.length + 1));
                } else {
                    setTimeout(() => setIsDeleting(true), pauseDuration);
                }
            }
        };

        const timeout = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
        return () => clearTimeout(timeout);
    }, [displayedText, isDeleting, text]);

    return (
        <h1 className={className}>
            <span className="bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
                {displayedText}
            </span>
            <span className="text-gray-900 dark:text-white animate-cursor">|</span>
        </h1>
    );
};


// --- Chatbot Component (Updated with border hover effect) ---
const Chatbot = () => {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [language, setLanguage] = useState('en');
    const t = translations[language];
    const [messages, setMessages] = useState([{ text: t.welcome, sender: 'bot' }]);
    const messagesEndRef = useRef(null);

    useEffect(() => { document.documentElement.classList.toggle('dark', isDarkMode); }, [isDarkMode]);
    useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
    useEffect(() => {
        const newWelcome = translations[language].welcome;
        if (messages.length === 0 || messages[0].text !== newWelcome) {
            setMessages([{ text: newWelcome, sender: 'bot' }]);
        }
    }, [language, messages]);

    const handleSend = async () => {
        if (input.trim() === '') return;
        const userMessage = { text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        const messageToSend = input;
        setInput('');
        setIsLoading(true);
        const botResponse = await getAIResponse(messageToSend);
        setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
        setIsLoading(false);
    };

    const handleKeyPress = (e) => { if (e.key === 'Enter') handleSend(); };

    return (
        <div className="group relative h-[75vh] max-h-[580px] w-full rounded-2xl bg-transparent p-1 transition-all duration-300 ease-in-out hover:bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400">
            <div className="relative z-10 flex h-full w-full flex-col overflow-hidden rounded-xl bg-white/70 shadow-2xl backdrop-blur-xl dark:bg-slate-800/70">
                <div className="p-4 bg-blue-600 flex justify-between items-center text-white flex-shrink-0">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-white/20 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg></div>
                        <div><h1 className="text-lg font-bold">{t.title}</h1><p className="text-xs text-blue-100">{t.status}</p></div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-blue-500 text-white rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-white hover:scale-110 transition-transform"><option value="en">English</option><option value="hi">Hindi</option><option value="ta">Tamil</option></select>
                        <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full hover:bg-blue-500 hover:scale-110 transition-all">{isDarkMode ? '☀️' : '🌙'}</button>
                    </div>
                </div>
                <div className="flex-1 p-4 overflow-y-auto flex flex-col space-y-2 bg-gray-50/50 dark:bg-slate-900/50">
                    {messages.map((msg, index) => (<Message key={index} text={msg.text} sender={msg.sender} />))}
                    {isLoading && <ThinkingIndicator />}
                    <div ref={messagesEndRef} />
                </div>
                <div className="p-4 bg-white/80 dark:bg-slate-800/80 border-t border-gray-200 dark:border-slate-700 flex items-center flex-shrink-0 space-x-3">
                    <div className="flex-1 rounded-full p-0.5 bg-gray-200 dark:bg-slate-700 focus-within:bg-gradient-to-r from-purple-400 to-blue-400 hover:bg-gradient-to-r transition-colors duration-300">
                        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={handleKeyPress} placeholder={t.placeholder} className="w-full p-2.5 border-none rounded-full bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-0"/>
                    </div>
                    <button onClick={handleSend} disabled={isLoading} className="bg-blue-600 text-white p-3 rounded-full hover:brightness-110 hover:shadow-lg hover:shadow-blue-500/50 dark:hover:shadow-blue-400/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed flex-shrink-0 transition-all active:scale-95"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4 20-7z"/></svg></button>
                </div>
            </div>
        </div>
    );
};


// --- App Component (No changes needed) ---
function App() {
    const [language] = useState('en');
    const t = translations[language];

    return (
        <div className="relative bg-gray-50 dark:bg-slate-900 w-full min-h-screen overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-200 dark:bg-blue-900/50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-200 dark:bg-purple-900/50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                <div className="absolute -bottom-20 left-20 w-80 h-80 bg-pink-200 dark:bg-pink-900/50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            </div>
            
            <main className="relative z-10 grid min-h-screen w-full place-items-center p-4">
                <div className="flex w-full max-w-6xl flex-col items-center justify-center gap-8 lg:flex-row lg:items-center lg:justify-center lg:gap-16">
                    
                    <div className="w-full max-w-md flex-shrink-0 text-center lg:text-left min-h-[16rem] lg:min-h-0 flex flex-col justify-center">
                        <TypingEffect 
                            text={t.heroTitle} 
                            className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white"
                        />
                        <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
                            {t.heroSubtitle}
                        </p>
                    </div>

                    <div className="w-full max-w-lg flex-shrink-0">
                        <Chatbot />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;

