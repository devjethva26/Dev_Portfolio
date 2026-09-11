/**
 * ============================================================================
 * script.js — Dev Jethva Portfolio Script
 * ============================================================================
 * Features:
 * 1. Multi-Language System (English [Default], Hindi, Gujarati) with Persistent Memory
 * 2. Playful Tab Visibility Teaser ("Heyy come back!", "Don't leave me 🥺")
 * 3. Interactive 360-Degree Logo Spin Physics on Click
 * 4. Dark & Light Theme Management synced with localStorage
 * 5. Dynamic footer copyright year update
 * 6. Scroll Depth Progress Bar pinned at top
 * 7. Mobile drawer navigation menu toggle
 * 8. Scrollspy navigation link highlighting
 * 9. Theme-Adaptive Header Elevation via CSS Variables & Class Toggling
 * 10. Smooth scroll reveal animations via IntersectionObserver
 * 11. 3D Magnetic Perspective Tilt on Photo Card & Service Cards
 * 12. Mouse-following spotlight reflections for glass cards
 * 13. Material button ripple physics
 * 14. Security-Gated Contact Form:
 *     - Strict 10-digit Indian phone verification
 *     - Dual dispatch: Supabase database and Formspree notification
 *     - Unlocks verified direct WhatsApp (+91 94080 31778) and calling
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================================
     1. MULTI-LANGUAGE SYSTEM (EN / HI / GU)
     ========================================================================= */
  const translations = {
    en: {
      nav_home: "Home",
      nav_about: "About",
      nav_services: "Services",
      nav_skills: "Skills",
      nav_education: "Education",
      nav_journey: "Journey",
      nav_projects: "Projects",
      nav_contact: "Contact",
      hero_badge: "Available for freelance projects & collaboration",
      hero_hi: "Hi, I'm",
      hero_subtitle: "Frontend Developer & Freelance Web Designer",
      hero_desc: "I design and code modern, high-speed static websites for businesses, consultants, and individuals—delivering clean aesthetics and conversion-focused designs that look great on any device.",
      hero_btn_hire: "Hire Me for a Project",
      hero_btn_offer: "What I Offer",
      hero_chip: "Semester 3 • Noble University",
      about_tag: "About Me",
      about_title: "Learning today. Building tomorrow.",
      about_p1: "I am a dedicated Computer Applications student at Noble University, currently in Semester 3. I have a passion for transforming visual concepts into clean, accessible, and high-performance websites.",
      about_p2: "Alongside my academic coursework, I work with clients as a freelance web designer building lightweight static websites. My core toolkit revolves around semantic HTML, modern CSS, and vanilla JavaScript, backed by foundational knowledge of Java and SQL.",
      about_p3: "Whether it's a landing page for a local business, an architect's portfolio, or a personal brand site, I focus on clean code, zero bloat, instant load speeds, and seamless mobile responsiveness.",
      meta_degree: "Degree",
      meta_institution: "Institution",
      meta_status: "Freelance Status",
      meta_status_val: "Open for Client Projects",
      meta_specialization: "Specialization",
      meta_spec_val: "Responsive Static Websites & UI",
      services_tag: "Freelance Offerings",
      services_title: "How I Can Help Your Business",
      services_subtitle: "Affordable, fast, and high-quality web solutions built without bloated page builders.",
      service1_title: "Static Website Development",
      service1_desc: "Custom hand-coded websites for small businesses, doctors, and consultants. Ultra-fast loading times, high Google PageSpeed scores, and zero server bloat.",
      service1_li1: "• Multi-page or Single-page sites",
      service1_li2: "• Clean, semantic HTML5 & CSS3",
      service1_li3: "• SEO-friendly document hierarchy",
      service2_title: "Mobile-First UI Design",
      service2_desc: "Every website is built to provide an app-like experience on smartphones, tablets, laptops, and wide desktop screens without breaking or zooming.",
      service2_li1: "• 100% fluid responsive layouts",
      service2_li2: "• Touch-friendly mobile menus",
      service2_li3: "• Modern glassmorphic & minimal themes",
      service3_title: "Inquiry Forms & WhatsApp",
      service3_desc: "Direct connection mechanisms that convert casual visitors into paying customers without requiring complicated database subscriptions.",
      service3_li1: "• Instant email alert contact forms",
      service3_li2: "• 1-Click WhatsApp chat buttons",
      service3_li3: "• Click-to-call direct phone triggers",
      service4_title: "Hosting & Domain Setup",
      service4_desc: "End-to-end setup taking your site live on modern cloud platforms with free SSL certificates and custom domain name linking.",
      service4_li1: "• Free Netlify / Vercel / GitHub deployment",
      service4_li2: "• HTTPS / SSL certificate activation",
      service4_li3: "• Custom .com / .in domain mapping",
      skills_tag: "Capabilities",
      skills_title: "Core Skills",
      skills_subtitle: "Technologies and concepts I utilize to construct client sites.",
      skill_html_desc: "Crafting clean, accessible, and semantically structured web pages that serve as a solid base for web apps.",
      skill_css_desc: "Designing modern, responsive layouts using Flexbox, CSS Grid, clean styling techniques, and subtle transitions.",
      skill_js_desc: "Building interactive client-side functionality, dynamic DOM manipulation, and smooth UI animations.",
      skill_java_desc: "Grasping Object-Oriented Programming (OOP) concepts, class structures, standard methods, and clean problem solving.",
      skill_sql_desc: "Understanding relational databases, writing structured queries, creating schema tables, and managing data records.",
      edu_tag: "Academic Background",
      edu_title: "Education",
      edu_subtitle: "My academic trajectory, grades, and qualifications.",
      edu_term1: "Semester 3 • Currently Pursuing",
      edu_desc1: "Strengthening software engineering and programming foundations. Successfully completed First Year with consistent academic performance while mastering database design, object-oriented concepts, and web architectures.",
      edu_pill_curr: "Current: Semester 3",
      edu_term2: "Class 12 (HSC) • 2025",
      edu_score_badge: "Score: 68.26%",
      edu_desc2: "Completed higher secondary education in 2025 with an aggregate score of 68.26%, establishing mathematical, analytical, and computational foundations before stepping into bachelor's studies.",
      edu_year: "Year: 2025",
      edu_score: "Score: 68.26%",
      journey_tag: "Roadmap",
      journey_title: "Developer Journey",
      journey_subtitle: "How I am structuring my growth step by step.",
      phase1_title: "Learning the Fundamentals",
      phase1_desc: "Mastering document structure, styling properties, responsiveness, and interactive scripting.",
      phase2_title: "Strengthening Programming",
      phase2_desc: "Deepening logical thinking, object-oriented concepts, algorithms, and structured software creation.",
      phase3_title: "Understanding Databases",
      phase3_desc: "Grasping relational schema design, primary & foreign keys, normalization, and data retrieval.",
      phase4_title: "Building Client Websites",
      phase4_pill: "Live for Hire",
      phase4_desc: "Creating modern static web solutions for businesses and building production client projects.",
      projects_tag: "Work & Creation",
      projects_title: "Featured Projects",
      projects_subtitle: "Real-world templates and upcoming client demos. This space grows with every build.",
      proj1_status: "In Development",
      proj1_name: "Local Business Static Template",
      proj1_desc: "A lightweight, high-conversion static website concept built with pure HTML5, modern CSS layouts, and direct WhatsApp lead triggers.",
      proj2_status: "Complete",
      proj2_name: "Portfolio & Admin Dashboard",
      proj2_desc: "A fully responsive personal portfolio connected directly to Supabase cloud database with SHA-256 hashed admin authorization.",
      contact_tag: "Get In Touch",
      contact_title: "Let's build your website.",
      contact_subtitle: "Have an idea for your business website? Register your details below to unlock direct phone and WhatsApp chat access.",
      inquiry_title: "Direct Inquiries",
      inquiry_desc: "Reach out for freelance project quotes, web redesigns, or collaborations.",
      lbl_direct_email: "Direct Email",
      lbl_mobile_wa: "Mobile & WhatsApp",
      val_locked_msg: "Locked for security (Register below)",
      lbl_response_time: "Response Time",
      val_response_time: "Within 24 Hours",
      status_note: "Available for freelance projects & consultations",
      banner_lock: "🔒 Security Check",
      banner_desc: "Enter your contact details to unlock WhatsApp and phone access.",
      lbl_name: "Your Name *",
      lbl_email: "Email Address *",
      lbl_phone: "Your Phone / WhatsApp Number *",
      lbl_subject: "Project Type / Subject *",
      lbl_message: "Project Details *",
      btn_submit_unlock: "Register & Unlock WhatsApp",
      unlocked_access_badge: "Access Granted",
      unlocked_heading: "You're Registered!",
      unlocked_desc: "Your project inquiry is recorded. You can now connect directly with Dev Jethva:",
      unlocked_phone_tag: "Direct Call:",
      unlocked_btn_wa: "Continue to WhatsApp Chat"
    },
    hi: {
      nav_home: "होम",
      nav_about: "परिचय",
      nav_services: "सेवाएं",
      nav_skills: "कौशल",
      nav_education: "शिक्षा",
      nav_journey: "सफ़र",
      nav_projects: "प्रोजेक्ट्स",
      nav_contact: "संपर्क",
      hero_badge: "फ्रीलांस प्रोजेक्ट्स और सहयोग के लिए उपलब्ध",
      hero_hi: "नमस्ते, मैं हूँ",
      hero_subtitle: "फ्रंटएंड डेवलपर और फ्रीलांस वेब डिज़ाइनर",
      hero_desc: "मैं व्यवसायों, सलाहकारों और व्यक्तियों के लिए आधुनिक, तेज़ और सुंदर वेबसाइट डिज़ाइन और कोड करता हूँ जो हर डिवाइस पर बेहतरीन दिखती हैं।",
      hero_btn_hire: "प्रोजेक्ट के लिए संपर्क करें",
      hero_btn_offer: "मेरी सेवाएं देखें",
      hero_chip: "सेमेस्टर 3 • नोबल यूनिवर्सिटी",
      about_tag: "परिचय",
      about_title: "आज सीख रहा हूँ, कल का निर्माण कर रहा हूँ।",
      about_p1: "मैं नोबल यूनिवर्सिटी में कंप्यूटर एप्लीकेशन का छात्र हूँ, वर्तमान में सेमेस्टर 3 में। मुझे विज़ुअल विचारों को सुलभ और तेज़ वेबसाइटों में बदलने का गहरा शौक है।",
      about_p2: "अपनी पढ़ाई के साथ-साथ, मैं क्लाइंट्स के लिए आधुनिक HTML, CSS और JavaScript का उपयोग करके उच्च-प्रदर्शन वाली वेबसाइट्स बनाता हूँ। साथ ही Java और SQL का भी मजबूत ज्ञान है।",
      about_p3: "चाहे वह स्थानीय व्यवसाय के लिए लैंडिंग पेज हो या आर्किटेक्ट का पोर्टफोलियो, मेरा मुख्य ध्यान स्वच्छ कोड, तेज़ स्पीड और मोबाइल रिस्पॉन्सिवनेस पर होता है।",
      meta_degree: "डिग्री",
      meta_institution: "संस्थान",
      meta_status: "फ्रीलांस स्थिति",
      meta_status_val: "क्लाइंट प्रोजेक्ट्स के लिए उपलब्ध",
      meta_specialization: "विशेषज्ञता",
      meta_spec_val: "रिस्पॉन्सिव वेबसाइट्स और UI डिजाइन",
      services_tag: "फ्रीलांस सेवाएं",
      services_title: "मैं आपके व्यवसाय की कैसे मदद कर सकता हूँ",
      services_subtitle: "बिना किसी भारी पेज बिल्डर के बनी सस्ती, तेज़ और उच्च गुणवत्ता वाली वेब सेवाएँ।",
      service1_title: "स्टैटिक वेबसाइट डेवलपमेंट",
      service1_desc: "छोटे व्यवसायों, डॉक्टरों और सलाहकारों के लिए कस्टम कोडेड वेबसाइटें। तेज़ लोडिंग और ज़ीरो सर्वर ब्लोट।",
      service1_li1: "• मल्टी-पेज या सिंगल-पेज वेबसाइट",
      service1_li2: "• स्वच्छ और संरचित HTML5 और CSS3",
      service1_li3: "• SEO अनुकूल संरचना",
      service2_title: "मोबाइल-फर्स्ट UI डिज़ाइन",
      service2_desc: "प्रत्येक वेबसाइट स्मार्टफ़ोन, टैबलेट और लैपटॉप पर एक सहज ऐप जैसा अनुभव प्रदान करने के लिए बनाई जाती है।",
      service2_li1: "• 100% फ्लूइड रिस्पॉन्सिव लेआउट",
      service2_li2: "• टच-फ्रेंडली मोबाइल मेनू",
      service2_li3: "• आधुनिक ग्लास थीम और मिनिमल स्टाइल",
      service3_title: "पूछताछ फ़ॉर्म और व्हाट्सएप",
      service3_desc: "आगंतुकों को ग्राहकों में बदलने के लिए सीधे संपर्क माध्यम।",
      service3_li1: "• तत्काल ईमेल सूचना संपर्क फ़ॉर्म",
      service3_li2: "• 1-क्लिक व्हाट्सएप चैट बटन",
      service3_li3: "• सीधे कॉल करने की सुविधा",
      service4_title: "होस्टिंग और डोमेन सेटअप",
      service4_desc: "मुफ्त SSL प्रमाणपत्र और कस्टम डोमेन के साथ आपकी साइट को क्लाउड प्लेटफ़ॉर्म पर लाइव करने की पूरी व्यवस्था।",
      service4_li1: "• मुफ्त Netlify / Vercel / GitHub डिप्लॉयमेंट",
      service4_li2: "• HTTPS / SSL सुरक्षा सक्रियण",
      service4_li3: "• कस्टम .com / .in डोमेन मैपिंग",
      skills_tag: "क्षमताएं",
      skills_title: "मुख्य कौशल",
      skills_subtitle: "तकनीकें जिनका उपयोग मैं वेबसाइट्स बनाने के लिए करता हूँ।",
      skill_html_desc: "स्वच्छ, सुलभ और संरचित वेब पेज बनाना जो अनुप्रयोगों के लिए एक ठोस आधार प्रदान करते हैं।",
      skill_css_desc: "Flexbox, CSS Grid और आधुनिक तकनीकों का उपयोग करके सुंदर लेआउट तैयार करना।",
      skill_js_desc: "इंटरैक्टिव कार्यक्षमता, डायनामिक DOM मैनिपुलेशन और स्मूथ एनिमेशन बनाना।",
      skill_java_desc: "ऑब्जेक्ट-ओरिएंटेड प्रोग्रामिंग (OOP), क्लास संरचना और समस्या निवारण को समझना।",
      skill_sql_desc: "रिलेशनल डेटाबेस को समझना, क्वेरी लिखना और डेटा रिकॉर्ड प्रबंधित करना।",
      edu_tag: "शैक्षणिक पृष्ठभूमि",
      edu_title: "शिक्षा",
      edu_subtitle: "मेरी शैक्षणिक योग्यताएं और ग्रेड।",
      edu_term1: "सेमेस्टर 3 • वर्तमान में अध्ययनरत",
      edu_desc1: "सॉफ्टवेयर इंजीनियरिंग और प्रोग्रामिंग की नींव को मजबूत करना। डेटाबेस और वेब आर्किटेक्चर में निरंतर अच्छा प्रदर्शन।",
      edu_pill_curr: "वर्तमान: सेमेस्टर 3",
      edu_term2: "कक्षा 12 (HSC) • 2025",
      edu_score_badge: "अंक: 68.26%",
      edu_desc2: "2025 में 68.26% अंकों के साथ उच्चतर माध्यमिक शिक्षा पूरी की, जिसने समस्या समाधान की मजबूत नींव रखी।",
      edu_year: "वर्ष: 2025",
      edu_score: "अंक: 68.26%",
      journey_tag: "रोडमैप",
      journey_title: "डेवलपर यात्रा",
      journey_subtitle: "कदम दर कदम मेरे विकास की योजना।",
      phase1_title: "मूल सिद्धांतों को सीखना",
      phase1_desc: "दस्तावेज़ संरचना, स्टाइलिंग, रिस्पॉन्सिवनेस और जावास्क्रिप्ट में महारत हासिल करना।",
      phase2_title: "प्रोग्रामिंग को सुदृढ़ बनाना",
      phase2_desc: "तार्किक सोच, ऑब्जेक्ट-ओरिएंटेड अवधारणाओं और एल्गोरिदम को गहरा करना।",
      phase3_title: "डेटाबेस की समझ",
      phase3_desc: "रिलेशनल स्कीमा डिज़ाइन, कीज़, नॉर्मलाइज़ेशन और डेटा पुनर्प्राप्ति को समझना।",
      phase4_title: "क्लाइंट वेबसाइट्स का निर्माण",
      phase4_pill: "काम के लिए उपलब्ध",
      phase4_desc: "व्यवसायों के लिए आधुनिक वेब समाधान और प्रोडक्शन प्रोजेक्ट्स बनाना।",
      projects_tag: "प्रोजेक्ट्स",
      projects_title: "प्रमुख प्रोजेक्ट्स",
      projects_subtitle: "व्यावहारिक टेम्पलेट्स और आगामी डेमो।",
      proj1_status: "प्रगति पर है",
      proj1_name: "लोकल बिज़नेस स्टैटिक टेम्पलेट",
      proj1_desc: "शुद्ध HTML5, आधुनिक CSS और व्हाट्सएप लीड ट्रिगर्स के साथ निर्मित एक तेज़ वेबसाइट टेम्पलेट।",
      proj2_status: "पूर्ण",
      proj2_name: "पोर्टफोलियो और एडमिन डैशबोर्ड",
      proj2_desc: "Supabase क्लाउड डेटाबेस और SHA-256 एडमिन सुरक्षा से जुड़ा पूरी तरह से रिस्पॉन्सिव पोर्टफोलियो।",
      contact_tag: "संपर्क करें",
      contact_title: "आइए आपकी वेबसाइट बनाएं।",
      contact_subtitle: "क्या आपके पास अपने व्यवसाय के लिए कोई विचार है? सीधे फोन और व्हाट्सएप चैट अनलॉक करने के लिए नीचे विवरण दर्ज करें।",
      inquiry_title: "सीधी पूछताछ",
      inquiry_desc: "फ्रीलांस प्रोजेक्ट कोट्स, वेबसाइट रीडिज़ाइन या सहयोग के लिए संपर्क करें।",
      lbl_direct_email: "सीधा ईमेल",
      lbl_mobile_wa: "मोबाइल और व्हाट्सएप",
      val_locked_msg: "सुरक्षा के लिए लॉक है (नीचे रजिस्टर करें)",
      lbl_response_time: "प्रतिक्रिया समय",
      val_response_time: "24 घंटे के भीतर",
      status_note: "फ्रीलांस प्रोजेक्ट्स और परामर्श के लिए उपलब्ध",
      banner_lock: "🔒 सुरक्षा जांच",
      banner_desc: "व्हाट्सएप और फोन संपर्क अनलॉक करने के लिए अपना विवरण दर्ज करें।",
      lbl_name: "आपका नाम *",
      lbl_email: "ईमेल पता *",
      lbl_phone: "फोन / व्हाट्सएप नंबर *",
      lbl_subject: "प्रोजेक्ट का प्रकार / विषय *",
      lbl_message: "प्रोजेक्ट का विवरण *",
      btn_submit_unlock: "रजिस्टर करें और व्हाट्सएप अनलॉक करें",
      unlocked_access_badge: "पहुंच स्वीकृत",
      unlocked_heading: "आपका पंजीकरण हो गया!",
      unlocked_desc: "आपकी पूछताछ दर्ज कर ली गई है। अब आप देव जेठवा से सीधे संपर्क कर सकते हैं:",
      unlocked_phone_tag: "सीधा कॉल:",
      unlocked_btn_wa: "व्हाट्सएप चैट शुरू करें"
    },
    gu: {
      nav_home: "હોમ",
      nav_about: "વિશે",
      nav_services: "સેવાઓ",
      nav_skills: "આવડત",
      nav_education: "શિક્ષણ",
      nav_journey: "સફર",
      nav_projects: "પ્રોજેક્ટ્સ",
      nav_contact: "સંપર્ક",
      hero_badge: "ફ્રીલાન્સ પ્રોજેક્ટ્સ અને સહયોગ માટે ઉપલબ્ધ",
      hero_hi: "નમસ્તે, હું છું",
      hero_subtitle: "ફ્રન્ટએન્ડ ડેવલપર અને ફ્રીલાન્સ વેબ ડિઝાઇનર",
      hero_desc: "હું બિઝનેસ, કન્સલ્ટન્ટ્સ અને વ્યક્તિઓ માટે આધુનિક, સુપર-ફાસ્ટ અને સુંદર સ્ટેટિક વેબસાઇટ્સ ડિઝાઇન અને કોડ કરું છું જે દરેક ડિવાઇસ પર સરસ દેખાય છે.",
      hero_btn_hire: "પ્રોજેક્ટ માટે હાયર કરો",
      hero_btn_offer: "મારી સેવાઓ જુઓ",
      hero_chip: "સેમેસ્ટર 3 • નોબલ યુનિવર્સિટી",
      about_tag: "મારા વિશે",
      about_title: "આજે શીખી રહ્યો છું, આવતીકાલનું નિર્માણ કરું છું.",
      about_p1: "હું નોબલ યુનિવર્સિટીમાં કોમ્પ્યુટર એપ્લિકેશન્સનો વિદ્યાર્થી છું, હાલમાં સેમેસ્ટર 3 માં અભ્યાસ કરું છું. મને ડિજિટલ વિચારોને ઝડપી અને સ્વચ્છ વેબસાઇટ્સમાં ફેરવવાનો શોખ છે.",
      about_p2: "અભ્યાસની સાથે, હું ફ્રીલાન્સ વેબ ડિઝાઇનર તરીકે ક્લાયન્ટ્સ માટે આધુનિક HTML, CSS અને JavaScript નો ઉપયોગ કરીને વેબસાઇટ્સ બનાવું છું. સાથે સાથે Java અને SQL નું પાયાનું જ્ઞાન પણ ધરાવું છું.",
      about_p3: "સ્થાનિક વ્યવસાયનું લેન્ડિંગ પેજ હોય કે આર્કિટેક્ટનું પોર્ટફોલિયો, મારો મુખ્ય ભાર ક્લીન કોડ, ઝીરો બ્લોટ અને ઝડપી લોડ સ્પીડ પર હોય છે.",
      meta_degree: "ડિગ્રી",
      meta_institution: "સંસ્થા",
      meta_status: "ફ્રીલાન્સ સ્થિતિ",
      meta_status_val: "ક્લાયન્ટ પ્રોજેક્ટ્સ માટે ઉપલબ્ધ",
      meta_specialization: "વિશેષતા",
      meta_spec_val: "રિસ્પોન્સિવ સ્ટેટિક વેબસાઇટ્સ અને UI",
      services_tag: "ફ્રીલાન્સ સેવાઓ",
      services_title: "હું તમારા વ્યવસાયને કેવી રીતે મદદ કરી શકું",
      services_subtitle: "કોઈપણ ભારે પેજ બિલ્ડર વગર બનેલા સસ્તા, ઝડપી અને ઉચ્ચ ગુણવત્તાવાળા વેબ સોલ્યુશન્સ.",
      service1_title: "સ્ટેટિક વેબસાઇટ ડેવલપમેન્ટ",
      service1_desc: "નાના વ્યવસાયો, ડોકટરો અને કન્સલ્ટન્ટ્સ માટે કસ્ટમ કોડેડ વેબસાઇટ્સ. અલ્ટ્રા-ફાસ્ટ લોડિંગ ટાઇમ્સ અને શ્રેષ્ઠ સ્પીડ.",
      service1_li1: "• મલ્ટી-પેજ અથવા સિંગલ-પેજ સાઇટ્સ",
      service1_li2: "• ક્લીન અને સચોટ HTML5 અને CSS3",
      service1_li3: "• SEO અનુકૂળ માળખું",
      service2_title: "મોબાઇલ-ફર્સ્ટ UI ડિઝાઇન",
      service2_desc: "દરેક વેબસાઇટ સ્માર્ટફોન, ટેબ્લેટ અને લેપટોપ પર એકદમ એપ્લિકેશન જેવો સરળ અનુભવ પૂરો પાડે છે.",
      service2_li1: "• 100% ફ્લુઇડ રિસ્પોન્સિવ લેઆઉટ",
      service2_li2: "• ટચ-ફ્રેન્ડલી મોબાઇલ મેનૂ",
      service2_li3: "• આધુનિક ગ્લાસ અને મિનિમલ થીમ્સ",
      service3_title: "પૂછપરછ ફોર્મ્સ અને વોટ્સએપ",
      service3_desc: "મુલાકાતીઓને સીધા ગ્રાહકોમાં પરિવર્તિત કરવા માટે સરળ અને ઝડપી સંપર્ક સુવિધાઓ.",
      service3_li1: "• ઇન્સ્ટન્ટ ઇમેઇલ એલર્ટ કોન્ટેક્ટ ફોર્મ",
      service3_li2: "• 1-ક્લિક વોટ્સએપ ચેટ બટન",
      service3_li3: "• સીધા ફોન કોલ કરવાની સુવિધા",
      service4_title: "હોસ્ટિંગ અને ડોમેન સેટઅપ",
      service4_desc: "મફત SSL સર્ટિફિકેટ અને કસ્ટમ ડોમેન સાથે તમારી વેબસાઇટને ક્લાઉડ પર લાઈવ કરવાનો સંપૂર્ણ સેટઅપ.",
      service4_li1: "• મફત Netlify / Vercel / GitHub ડિપ્લોયમેન્ટ",
      service4_li2: "• HTTPS / SSL સુરક્ષા સક્રિયકરણ",
      service4_li3: "• કસ્ટમ .com / .in ડોમેન લિંકિંગ",
      skills_tag: "આવડત",
      skills_title: "મુખ્ય કૌશલ્યો",
      skills_subtitle: "ક્લાયન્ટ સાઇટ્સ બનાવવા માટે હું જે ટેકનોલોજીનો ઉપયોગ કરું છું.",
      skill_html_desc: "વેબ એપ્સ માટે મજબૂત પાયા તરીકે કામ કરતા સ્વચ્છ અને માળખાગત વેબ પૃષ્ઠો બનાવવા.",
      skill_css_desc: "Flexbox, CSS Grid અને આધુનિક શૈલીનો ઉપયોગ કરીને સુંદર લેઆઉટ ડિઝાઇન કરવા.",
      skill_js_desc: "ઇન્ટરેક્ટિવ ક્લાયન્ટ-સાઇડ કાર્યક્ષમતા અને સરળ UI એનિમેશન બનાવવું.",
      skill_java_desc: "ઑબ્જેક્ટ-ઓરિએન્ટેડ પ્રોગ્રામિંગ (OOP), ક્લાસ માળખું અને લોજિકલ સમસ્યા નિવારણ સમજવું.",
      skill_sql_desc: "રિલેશનલ ડેટાબેસેસ સમજવું, ક્વેરીઝ લખવી અને ડેટા રેકોર્ડ્સનું સંચાલન કરવું.",
      edu_tag: "શૈક્ષણિક પૃષ્ઠભૂમિ",
      edu_title: "શિક્ષણ",
      edu_subtitle: "મારી શૈક્ષણિક લાયકાતો અને ગ્રેડ્સ.",
      edu_term1: "સેમેસ્ટર 3 • હાલમાં ચાલુ",
      edu_desc1: "સોફ્ટવેર એન્જિનિયરિંગ અને પ્રોગ્રામિંગના પાયાને મજબૂત બનાવવું. ડેટાબેઝ ડિઝાઇન અને વેબ આર્કિટેક્ચરમાં ઉત્કૃષ્ટ પ્રદર્શન.",
      edu_pill_curr: "હાલમાં: સેમેસ્ટર 3",
      edu_term2: "ધોરણ 12 (HSC) • 2025",
      edu_score_badge: "પરિણામ: 68.26%",
      edu_desc2: "2025 માં 68.26% સાથે ઉચ્ચતર માધ્યમિક શિક્ષણ પૂર્ણ કર્યું, જેણે એનાલિટિકલ વિચારસરણીનો મજબૂત પાયો નાખ્યો.",
      edu_year: "વર્ષ: 2025",
      edu_score: "ટકા: 68.26%",
      journey_tag: "રોડમેપ",
      journey_title: "ડેવલપર સફર",
      journey_subtitle: "પગલાં દર પગલાં મારા વિકાસનું આયોજન.",
      phase1_title: "મૂળભૂત બાબતો શીખવી",
      phase1_desc: "ડોક્યુમેન્ટ સ્ટ્રક્ચર, સ્ટાઇલિંગ પ્રોપર્ટીઝ, રિસ્પોન્સિવનેસ અને સ્ક્રિપ્ટીંગમાં નિપુણતા.",
      phase2_title: "પ્રોગ્રામિંગ મજબૂત કરવું",
      phase2_desc: "તાર્કિક વિચારસરણી, ઑબ્જેક્ટ-ઓરિએન્ટેડ કોન્સેપ્ટ્સ અને એલ્ગોરિધમ્સ વધુ ઊંડાણપૂર્વક સમજવા.",
      phase3_title: "ડેટાબેઝની સમજ",
      phase3_desc: "રિલેશનલ સ્કીમા ડિઝાઇન, પ્રાઇમરી કી, નોર્મલાઇઝેશન અને ડેટા મેળવવાની સમજ.",
      phase4_title: "ક્લાયન્ટ સાઇટ્સનું નિર્માણ",
      phase4_pill: "કામ માટે ઉપલબ્ધ",
      phase4_desc: "વ્યવસાયો માટે આધુનિક સ્ટેટિક વેબ સોલ્યુશન્સ અને પ્રોડક્શન પ્રોજેક્ટ્સનું નિર્માણ.",
      projects_tag: "પ્રોજેક્ટ્સ",
      projects_title: "પસંદગીના પ્રોજેક્ટ્સ",
      projects_subtitle: "વાસ્તવિક ટેમ્પ્લેટ્સ અને ક્લાયન્ટ ડેમો.",
      proj1_status: "કામ ચાલુ છે",
      proj1_name: "લોકલ બિઝનેસ સ્ટેટિક ટેમ્પલેટ",
      proj1_desc: "શુદ્ધ HTML5, આધુનિક CSS અને સીધા વોટ્સએપ લીડ ટ્રિગર્સ સાથે બનેલી એક હળવી વેબસાઇટ કોન્સેપ્ટ.",
      proj2_status: "સંપૂર્ણ",
      proj2_name: "પોર્ટફોલિયો અને એડમિન ડેશબોર્ડ",
      proj2_desc: "Supabase ક્લાઉડ ડેટાબેઝ અને SHA-256 એડમિન સુરક્ષા સાથે જોડાયેલ સંપૂર્ણ રિસ્પોન્સિવ પોર્ટફોલિયો.",
      contact_tag: "સંપર્ક કરો",
      contact_title: "ચાલો તમારી વેબસાઇટ બનાવીએ.",
      contact_subtitle: "તમારા વ્યવસાય માટે કોઈ વિચાર છે? સીધો ફોન અને વોટ્સએપ સંપર્ક અનલૉક કરવા માટે નીચે વિગતો નોંધાવો.",
      inquiry_title: "સીધી પૂછપરછ",
      inquiry_desc: "ફ્રીલાન્સ પ્રોજેક્ટ ક્વોટ્સ, વેબસાઇટ રિડિઝાઇન અથવા સહયોગ માટે સંપર્ક કરો.",
      lbl_direct_email: "સીધો ઇમેઇલ",
      lbl_mobile_wa: "મોબાઇલ અને વોટ્સએપ",
      val_locked_msg: "સુરક્ષા માટે લૉક છે (નીચે રજીસ્ટર કરો)",
      lbl_response_time: "પ્રતિસાદ સમય",
      val_response_time: "24 કલાકની અંદર",
      status_note: "ફ્રીલાન્સ પ્રોજેક્ટ્સ અને કન્સલ્ટેશન માટે ઉપલબ્ધ",
      banner_lock: "🔒 સુરક્ષા તપાસ",
      banner_desc: "વોટ્સએપ અને ફોન ઍક્સેસ અનલૉક કરવા માટે તમારી સંપર્ક વિગતો દાખલ કરો.",
      lbl_name: "તમારું નામ *",
      lbl_email: "ઇમેઇલ સરનામું *",
      lbl_phone: "તમારો ફોન / વોટ્સએપ નંબર *",
      lbl_subject: "પ્રોજેક્ટનો પ્રકાર / વિષય *",
      lbl_message: "પ્રોજેક્ટની વિગતો *",
      btn_submit_unlock: "રજીસ્ટર કરો અને વોટ્સએપ અનલૉક કરો",
      unlocked_access_badge: "મંજૂરી મળી",
      unlocked_heading: "તમારું રજીસ્ટ્રેશન થઈ ગયું!",
      unlocked_desc: "તમારી પૂછપરછ નોંધાઈ ગઈ છે. હવે તમે સીધા દેવ જેઠવા સાથે સંપર્ક કરી શકો છો:",
      unlocked_phone_tag: "સીધો કોલ:",
      unlocked_btn_wa: "વોટ્સએપ ચેટ શરૂ કરો"
    }
  };

  const langSelect = document.getElementById('lang-select');
  const savedLang = localStorage.getItem('dev_portfolio_lang') || 'en';

  const applyLanguage = (lang) => {
    const langData = translations[lang] || translations.en;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (langData[key]) {
        el.textContent = langData[key];
      }
    });

    if (langSelect) langSelect.value = lang;
    localStorage.setItem('dev_portfolio_lang', lang);
  };

  if (langSelect) {
    langSelect.addEventListener('change', (e) => {
      applyLanguage(e.target.value);
    });
  }

  applyLanguage(savedLang);

  /* =========================================================================
     2. PLAYFUL TAB VISIBILITY TEASER ("Heyy come back!" / "Don't leave me 🥺")
     ========================================================================= */
  const originalTitle = document.title;
  const awayMessages = [
    "Heyy come back!",
    "Don't leave me 🥺"
  ];

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      const randomMsg = awayMessages[Math.floor(Math.random() * awayMessages.length)];
      document.title = randomMsg;
    } else {
      document.title = originalTitle;
    }
  });

  /* =========================================================================
     3. INTERACTIVE 360 LOGO SPIN ON CLICK
     ========================================================================= */
  const logoElement = document.querySelector('.logo');
  if (logoElement) {
    logoElement.addEventListener('click', () => {
      logoElement.classList.add('spin-animation');
      setTimeout(() => {
        logoElement.classList.remove('spin-animation');
      }, 650);
    });
  }

  /* =========================================================================
     4. THEME MANAGEMENT (DARK / LIGHT MODE)
     ========================================================================= */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('dev_portfolio_theme') || 'dark';

  document.documentElement.setAttribute('data-theme', storedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const targetTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      document.documentElement.setAttribute('data-theme', targetTheme);
      localStorage.setItem('dev_portfolio_theme', targetTheme);
    });
  }

  /* =========================================================================
     5. DYNAMIC FOOTER YEAR
     ========================================================================= */
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* =========================================================================
     6. SCROLL PROGRESS INDICATOR
     ========================================================================= */
  let progressBar = document.querySelector('.scroll-progress-bar');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    document.body.prepend(progressBar);
  }

  const handleScrollProgress = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  };

  window.addEventListener('scroll', handleScrollProgress, { passive: true });

  /* =========================================================================
     7. MOBILE DRAWER NAVIGATION
     ========================================================================= */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMenu = () => {
    const isActive = hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    document.body.style.overflow = isActive ? 'hidden' : '';
  };

  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  /* =========================================================================
     8. SCROLLSPY (ACTIVE LINK DETECTION)
     ========================================================================= */
  const sections = document.querySelectorAll('section[id]');

  const handleActiveNavOnScroll = () => {
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

      if (targetNavLink) {
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          targetNavLink.classList.add('active');
        } else {
          targetNavLink.classList.remove('active');
        }
      }
    });
  };

  window.addEventListener('scroll', handleActiveNavOnScroll, { passive: true });

  /* =========================================================================
     9. HEADER ELEVATION ON SCROLL
     ========================================================================= */
  const header = document.getElementById('header');
  
  const handleHeaderElevation = () => {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('elevated');
    } else {
      header.classList.remove('elevated');
    }
  };

  handleHeaderElevation();
  window.addEventListener('scroll', handleHeaderElevation, { passive: true });

  /* =========================================================================
     10. SCROLL REVEAL (INTERSECTION OBSERVER)
     ========================================================================= */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserverOptions = {
    root: null,
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  };

  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, revealObserverOptions);

  revealElements.forEach((element) => {
    revealOnScroll.observe(element);
  });

  /* =========================================================================
     11. MOUSE SPOTLIGHT & 3D TILT EFFECT
     ========================================================================= */
  const glassPanels = document.querySelectorAll('.glass-panel');
  const tiltCards = document.querySelectorAll('.photo-card, .service-card');

  window.addEventListener('mousemove', (e) => {
    glassPanels.forEach((panel) => {
      const rect = panel.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      panel.style.setProperty('--mouse-x', `${x}px`);
      panel.style.setProperty('--mouse-y', `${y}px`);
    });
  }, { passive: true });

  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* =========================================================================
     12. MATERIAL BUTTON RIPPLE PHYSICS
     ========================================================================= */
  document.querySelectorAll('.btn').forEach((button) => {
    button.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const circle = document.createElement('span');
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add('ripple');

      const existingRipple = this.querySelector('.ripple');
      if (existingRipple) existingRipple.remove();

      this.appendChild(circle);
    });
  });

  /* =========================================================================
     13. CONTACT FORM: CLIENT REGISTRATION & WHATSAPP UNLOCK
     ========================================================================= */
  const SUPABASE_URL = 'https://nwvwrwwdtmejcqoanayv.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53dndyd3dkdG1lamNxb2FuYXl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5NjkyNDQsImV4cCI6MjEwNDU0NTI0NH0.hfDOvpxXzaPi80atyoXGX3P6boMmhrXXBPdMz7O5FxY';
  const FORMSPREE_URL = 'https://formspree.io/f/xnpqlzvp';

  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const feedbackBox = document.getElementById('form-feedback');
  
  const unlockedBox = document.getElementById('unlocked-contact-box');
  const whatsappDirectBtn = document.getElementById('whatsapp-direct-btn');
  const phoneDisplayVal = document.getElementById('phone-display-val');
  const phoneLockedItem = document.getElementById('phone-locked-item');

  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const isValidPhone = (phone) => {
      const cleaned = phone.replace(/[\s\-\(\)]/g, '');
      const phoneRegex = /^(?:\+91|91|0)?[6-9]\d{9}$/;
      if (!phoneRegex.test(cleaned)) return false;

      const coreDigits = cleaned.slice(-10);
      if (/^(\d)\1{9}$/.test(coreDigits)) return false;

      return true;
    };

    const showError = (input, errorId, message) => {
      input.classList.add('input-error');
      const errorSpan = document.getElementById(errorId);
      if (errorSpan) errorSpan.textContent = message;
    };

    const clearError = (input, errorId) => {
      input.classList.remove('input-error');
      const errorSpan = document.getElementById(errorId);
      if (errorSpan) errorSpan.textContent = '';
    };

    nameInput.addEventListener('input', () => clearError(nameInput, 'name-error'));
    emailInput.addEventListener('input', () => clearError(emailInput, 'email-error'));
    phoneInput.addEventListener('input', () => clearError(phoneInput, 'phone-error'));
    subjectInput.addEventListener('input', () => clearError(subjectInput, 'subject-error'));
    messageInput.addEventListener('input', () => clearError(messageInput, 'message-error'));

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      let hasErrors = false;
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const rawPhone = phoneInput.value.trim();
      const subject = subjectInput.value.trim();
      const message = messageInput.value.trim();

      if (!name) {
        showError(nameInput, 'name-error', 'Please enter your name');
        hasErrors = true;
      }
      if (!email) {
        showError(emailInput, 'email-error', 'Please enter your email');
        hasErrors = true;
      } else if (!isValidEmail(email)) {
        showError(emailInput, 'email-error', 'Please enter a valid email address');
        hasErrors = true;
      }
      if (!rawPhone) {
        showError(phoneInput, 'phone-error', 'Please enter your mobile number');
        hasErrors = true;
      } else if (!isValidPhone(rawPhone)) {
        showError(phoneInput, 'phone-error', 'Enter a valid 10-digit mobile number (e.g. 9876543210)');
        hasErrors = true;
      }
      if (!subject) {
        showError(subjectInput, 'subject-error', 'Please enter a subject');
        hasErrors = true;
      }
      if (!message) {
        showError(messageInput, 'message-error', 'Please enter your project details');
        hasErrors = true;
      }

      if (hasErrors) return;

      const digitsOnly = rawPhone.replace(/\D/g, '').slice(-10);
      const formattedPhone = `+91 ${digitsOnly}`;

      const originalBtnText = submitBtn.querySelector('.btn-text').textContent;
      submitBtn.disabled = true;
      submitBtn.querySelector('.btn-text').textContent = 'Verifying & Unlocking...';

      try {
        const emailFormattedMessage = `📞 Mobile Number: ${formattedPhone}\n👤 Client Name: ${name}\n✉️ Email: ${email}\n\n📝 Project Description:\n${message}`;

        const supabasePromise = fetch(`${SUPABASE_URL}/rest/v1/queries`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Prefer': 'return=representation'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            phone: formattedPhone,
            subject: subject,
            message: message,
            is_read: false
          })
        });

        const formspreePromise = fetch(FORMSPREE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            phone: formattedPhone,
            subject: `[${formattedPhone}] - ${subject}`,
            message: emailFormattedMessage,
            _replyto: email
          })
        });

        await Promise.all([supabasePromise, formspreePromise]);

        const whatsappMsg = `Hi Dev, I registered on your website regarding "${subject}". My name is ${name}. Let's connect!`;
        const whatsappUrl = `https://wa.me/919408031778?text=${encodeURIComponent(whatsappMsg)}`;
        whatsappDirectBtn.setAttribute('href', whatsappUrl);

        if (phoneDisplayVal) {
          phoneDisplayVal.innerHTML = `<a href="tel:+919408031778" style="color: var(--accent-bright); font-weight: 700;">+91 94080 31778</a>`;
          phoneDisplayVal.classList.remove('security-locked-text');
        }

        if (phoneLockedItem) {
          const iconBox = phoneLockedItem.querySelector('.info-icon');
          if (iconBox) {
            iconBox.classList.add('unlocked');
            iconBox.innerHTML = `
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
              </svg>
            `;
          }
        }

        contactForm.style.display = 'none';
        unlockedBox.style.display = 'flex';

      } catch (err) {
        console.error('Submission error:', err);
        feedbackBox.className = 'form-feedback error';
        feedbackBox.textContent = 'Could not register. Please check your internet connection.';
      } finally {
        submitBtn.disabled = false;
        submitBtn.querySelector('.btn-text').textContent = originalBtnText;
      }
    });
  }
});