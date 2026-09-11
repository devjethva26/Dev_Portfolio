/**
 * ============================================================================
 * script.js — Dev Jethva Portfolio Script (Fresher BCA Student Edition)
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================================
     1. MULTI-LANGUAGE SYSTEM (English [Default], Hindi, Gujarati)
     ========================================================================= */
  const translations = {
    en: {
      nav_home: "Home",
      nav_about: "About",
      nav_skills: "Skills",
      nav_looking: "Looking For",
      nav_projects: "Projects",
      nav_journey: "Journey",
      nav_education: "Education",
      nav_services: "Services",
      nav_contact: "Contact",
      hero_badge: "Fresher • BCA Student • Web Developer",
      hero_hi: "Hi, I'm",
      hero_subtitle: "BCA Student & Aspiring Web Developer",
      hero_desc: "I'm a BCA student and aspiring web developer currently learning, experimenting and building my skills in web development. I'm passionate about creating clean, responsive and user-friendly websites.",
      hero_btn_connect: "Let's Connect",
      hero_btn_skills: "View My Skills",
      hero_chip: "Noble University • Semester 3",
      photo_placeholder: "Profile Photo Placeholder",
      about_tag: "About Me",
      about_title: "About Me",
      about_p1: "I'm Dev Jethva, a BCA student at Noble University. I'm currently building my foundation in web development and programming.",
      about_p2: "I have been learning HTML, CSS, JavaScript, Java and SQL, and I'm interested in turning what I learn into practical websites and applications.",
      about_p3: "As a fresher, I'm focused on learning, improving my skills and getting opportunities to work on real-world projects.",
      meta_status: "Current Status",
      meta_status_val: "BCA Student & Aspiring Developer",
      meta_institution: "Institution",
      meta_focus: "Primary Focus",
      meta_focus_val: "Learning & Building Fundamentals",
      skills_tag: "Expertise",
      skills_title: "My Skills",
      skills_subtitle: "Core programming languages and technologies I am actively studying and practicing.",
      skill_html_desc: "Structuring clean, semantic, and accessible web pages.",
      skill_css_desc: "Styling responsive layouts with modern CSS principles.",
      skill_js_desc: "Adding interactivity and client-side logic to web elements.",
      skill_java_desc: "Understanding Object-Oriented Programming and core logic.",
      skill_sql_desc: "Working with relational databases and writing queries.",
      exploring_title: "Currently Exploring",
      tag_backend: "Backend Development",
      looking_tag: "Opportunities",
      looking_title: "What I'm Looking For",
      looking_subtitle: "I'm currently looking for opportunities where I can learn, contribute and gain real-world experience in web development.",
      look1_title: "Internships",
      look1_desc: "Looking for opportunities to gain professional experience.",
      look2_title: "Freelance Opportunities",
      look2_desc: "Open to simple website and portfolio projects.",
      look3_title: "Learning Opportunities",
      look3_desc: "Interested in collaborating, learning and improving my development skills.",
      projects_tag: "Portfolio Work",
      projects_title: "Projects",
      projects_subtitle: "Projects built during my learning journey and practical practice.",
      empty_badge: "Projects Coming Soon",
      empty_title: "Building My First Projects",
      empty_desc: "I'm currently working on building my first projects. This section will be updated as I create and complete new work.",
      preview_1: "First project coming soon...",
      preview_2: "More projects in progress...",
      journey_tag: "Timeline",
      journey_title: "My Learning Journey",
      journey_subtitle: "How I am structuring my growth step by step.",
      j2024: "Started exploring programming and web development.",
      j2025: "Continued learning HTML, CSS, JavaScript, Java and SQL.",
      j2026: "Currently pursuing BCA and working toward becoming a professional web developer.",
      edu_tag: "Academic Background",
      edu_title: "Education",
      edu_term: "Noble University • Semester 3",
      edu_badge: "Currently Pursuing",
      edu_desc: "Building a strong academic foundation in software principles, algorithms, database management systems, and web technologies.",
      services_tag: "Offerings",
      services_title: "What I Can Help With",
      services_subtitle: "Simple and clean web development assistance for beginners and small projects.",
      serv1_title: "Basic Websites",
      serv1_desc: "Simple responsive websites using HTML, CSS and JavaScript.",
      serv2_title: "Portfolio Websites",
      serv2_desc: "Personal portfolio websites for students, freelancers and beginners.",
      serv3_title: "Landing Pages",
      serv3_desc: "Clean and responsive landing pages for simple ideas and projects.",
      contact_tag: "Get In Touch",
      contact_title: "Let's Connect",
      contact_subtitle: "I'm always interested in learning, connecting with people and exploring new opportunities. Register your details below to unlock direct phone and WhatsApp chat access.",
      inquiry_title: "Direct Details",
      inquiry_desc: "Reach out for student collaborations, inquiries, or learning opportunities.",
      lbl_email_heading: "Email",
      lbl_mobile_wa: "Mobile & WhatsApp",
      val_locked_msg: "Locked for security (Register below)",
      status_note: "BCA Student • Noble University",
      banner_lock: "🔒 Security Check",
      banner_desc: "Enter your contact details to unlock WhatsApp and phone access.",
      lbl_name: "Your Name *",
      lbl_email: "Email Address *",
      lbl_phone: "Your Phone / WhatsApp Number *",
      lbl_subject: "Subject *",
      lbl_message: "Message *",
      btn_submit_unlock: "Register & Unlock WhatsApp",
      unlocked_access_badge: "Access Granted",
      unlocked_heading: "You're Registered!",
      unlocked_desc: "Your inquiry is recorded. You can now connect directly with Dev Jethva:",
      unlocked_phone_tag: "Direct Call:",
      unlocked_btn_wa: "WhatsApp Me"
    },
    hi: {
      nav_home: "होम",
      nav_about: "परिचय",
      nav_skills: "कौशल",
      nav_looking: "अवसर",
      nav_projects: "प्रोजेक्ट्स",
      nav_journey: "सफ़र",
      nav_education: "शिक्षा",
      nav_services: "सेवाएं",
      nav_contact: "संपर्क",
      hero_badge: "फ्रीेशर • BCA छात्र • वेब डेवलपर",
      hero_hi: "नमस्ते, मैं हूँ",
      hero_subtitle: "BCA छात्र और उभरता हुआ वेब डेवलपर",
      hero_desc: "मैं एक BCA छात्र और वेब डेवलपर हूँ जो वर्तमान में वेब डेवलपमेंट में सीख रहा हूँ और अपने कौशल का निर्माण कर रहा हूँ।",
      hero_btn_connect: "जुड़ें",
      hero_btn_skills: "कौशल देखें",
      hero_chip: "नोबल यूनिवर्सिटी • सेमेस्टर 3",
      photo_placeholder: "प्रोफाइल फोटो प्लेसहोल्डर",
      about_tag: "परिचय",
      about_title: "परिचय",
      about_p1: "मैं देव जेठवा हूँ, नोबल यूनिवर्सिटी में BCA का छात्र। वर्तमान में मैं वेब डेवलपमेंट और प्रोग्रामिंग की नींव बना रहा हूँ।",
      about_p2: "मैं HTML, CSS, JavaScript, Java और SQL सीख रहा हूँ, और जो सीखता हूँ उसे व्यावहारिक वेबसाइटों में बदलने में रुचि रखता हूँ।",
      about_p3: "एक फ्रीेशर के रूप में, मैं सीखने, अपने कौशल में सुधार करने और वास्तविक दुनिया के प्रोजेक्ट्स पर काम करने के अवसर पाने पर ध्यान केंद्रित कर रहा हूँ।",
      meta_status: "वर्तमान स्थिति",
      meta_status_val: "BCA छात्र और डेवलपर",
      meta_institution: "संस्थान",
      meta_focus: "मुख्य फोकस",
      meta_focus_val: "मूल बातें सीखना",
      skills_tag: "विशेषज्ञता",
      skills_title: "मेरे कौशल",
      skills_subtitle: "कोर प्रोग्रामिंग भाषाएं और तकनीकें जिनका मैं अभ्यास कर रहा हूँ।",
      skill_html_desc: "स्वच्छ, सिमेंटिक और सुलभ वेब पेज बनाना।",
      skill_css_desc: "आधुनिक CSS सिद्धांतों के साथ रिस्पॉन्सिव लेआउट तैयार करना।",
      skill_js_desc: "वेब तत्वों में इंटरैक्टिविटी जोड़ना।",
      skill_java_desc: "ऑब्जेक्ट-ओरिएंटेड प्रोग्रामिंग को समझना।",
      skill_sql_desc: "रिलेशनल डेटाबेस के साथ काम करना।",
      exploring_title: "वर्तमान में तलाश कर रहा हूँ",
      tag_backend: "बैकएंड डेवलपमेंट",
      looking_tag: "अवसर",
      looking_title: "मैं क्या ढूंढ रहा हूँ",
      looking_subtitle: "मैं ऐसे अवसरों की तलाश में हूँ जहाँ मैं वेब डेवलपमेंट में सीख सकूं और अनुभव प्राप्त कर सकूं।",
      look1_title: "इंटर्नशिप",
      look1_desc: "पेशेवर अनुभव प्राप्त करने के अवसर तलाश रहा हूँ।",
      look2_title: "फ्रीलांस अवसर",
      look2_desc: "साधारण वेबसाइट और पोर्टफोलियो प्रोजेक्ट्स के लिए खुला हूँ।",
      look3_title: "सीखने के अवसर",
      look3_desc: "सहयोग करने और अपने कौशल में सुधार करने में रुचि रखता हूँ।",
      projects_tag: "पोर्टफोलियो कार्य",
      projects_title: "प्रोजेक्ट्स",
      projects_subtitle: "मेरे सीखने के सफर के दौरान बनाए गए प्रोजेक्ट्स।",
      empty_badge: "प्रोजेक्ट्स जल्द आ रहे हैं",
      empty_title: "अपने पहले प्रोजेक्ट्स का निर्माण",
      empty_desc: "मैं वर्तमान में अपने पहले प्रोजेक्ट्स पर काम कर रहा हूँ। जैसे-जैसे नए काम पूरे होंगे, यह अनुभाग अपडेट किया जाएगा।",
      preview_1: "पहला प्रोजेक्ट जल्द आ रहा है...",
      preview_2: "अधिक प्रोजेक्ट्स प्रगति पर हैं...",
      journey_tag: "टाइमलाइन",
      journey_title: "मेरा सीखने का सफर",
      journey_subtitle: "मैं कदम दर कदम अपने विकास की संरचना कैसे कर रहा हूँ।",
      j2024: "प्रोग्रामिंग और वेब डेवलपमेंट की खोज शुरू की।",
      j2025: "HTML, CSS, JavaScript, Java और SQL सीखना जारी रखा।",
      j2026: "वर्तमान में BCA कर रहा हूँ और एक पेशेवर वेब डेवलपर बनने की दिशा में काम कर रहा हूँ।",
      edu_tag: "शैक्षणिक पृष्ठभूमि",
      edu_title: "शिक्षा",
      edu_term: "नोबल यूनिवर्सिटी • सेमेस्टर 3",
      edu_badge: "वर्तमान में अध्ययनरत",
      edu_desc: "सॉफ्टवेयर सिद्धांतों, एल्गोरिदम और डेटाबेस प्रबंधन में मजबूत शैक्षणिक नींव का निर्माण।",
      services_tag: "सेवाएं",
      services_title: "मैं किस में मदद कर सकता हूँ",
      services_subtitle: "शुरुआती और छोटे प्रोजेक्ट्स के लिए सरल वेब डेवलपमेंट सहायता।",
      serv1_title: "बुनियादी वेबसाइट्स",
      serv1_desc: "HTML, CSS और JavaScript का उपयोग करके सरल रिस्पॉन्सिव वेबसाइट्स।",
      serv2_title: "पोटफोलियो वेबसाइट्स",
      serv2_desc: "छात्रों, फ्रीलांसरों और शुरुआती लोगों के लिए व्यक्तिगत पोर्टफोलियो वेबसाइट्स।",
      serv3_title: "लैंडिंग पेज",
      serv3_desc: "साधारण विचारों और प्रोजेक्ट्स के लिए स्वच्छ और रिस्पॉन्सिव लैंडिंग पेज।",
      contact_tag: "संपर्क करें",
      contact_title: "जुड़ें",
      contact_subtitle: "मैं हमेशा सीखने, लोगों से जुड़ने और नए अवसरों की तलाश करने में रुचि रखता हूँ। सीधा फोन और व्हाट्सएप एक्सेस अनलॉक करने के लिए नीचे विवरण दर्ज करें।",
      inquiry_title: "प्रत्यक्ष विवरण",
      inquiry_desc: "छात्र सहयोग, पूछताछ या सीखने के अवसरों के लिए संपर्क करें।",
      lbl_email_heading: "ईमेल",
      lbl_mobile_wa: "मोबाइल और व्हाट्सएप",
      val_locked_msg: "सुरक्षा के लिए लॉक है (नीचे रजिस्टर करें)",
      status_note: "BCA छात्र • नोबल यूनिवर्सिटी",
      banner_lock: "🔒 सुरक्षा जांच",
      banner_desc: "व्हाट्सएप और फोन संपर्क अनलॉक करने के लिए विवरण दर्ज करें।",
      lbl_name: "आपका नाम *",
      lbl_email: "ईमेल पता *",
      lbl_phone: "फोन / व्हाट्सएप नंबर *",
      lbl_subject: "विषय *",
      lbl_message: "संदेश *",
      btn_submit_unlock: "रजिस्टर करें और व्हाट्सएप अनलॉक करें",
      unlocked_access_badge: "एक्सेस स्वीकृत",
      unlocked_heading: "पंजीकरण हो गया!",
      unlocked_desc: "आपकी पूछताछ दर्ज हो गई है। अब आप सीधे देव जेठवा से जुड़ सकते हैं:",
      unlocked_phone_tag: "सीधा कॉल:",
      unlocked_btn_wa: "व्हाट्सएप पर बात करें"
    },
    gu: {
      nav_home: "હોમ",
      nav_about: "વિશે",
      nav_skills: "આવડત",
      nav_looking: "તલાશ",
      nav_projects: "પ્રોજેક્ટ્સ",
      nav_journey: "સફર",
      nav_education: "શિક્ષણ",
      nav_services: "સેવાઓ",
      nav_contact: "સંપર્ક",
      hero_badge: "ફ્રેશર • BCA વિદ્યાર્થી • વેબ ડેવલપર",
      hero_hi: "નમસ્તે, હું છું",
      hero_subtitle: "BCA વિદ્યાર્થી અને ઉભરતો વેબ ડેવલપર",
      hero_desc: "હું એક BCA વિદ્યાર્થી અને વેબ ડેવલપર છું જે હાલમાં વેબ ડેવલપમેન્ટમાં શીખી રહ્યો છું અને કૌશલ્યો વિકસાવી રહ્યો છું.",
      hero_btn_connect: "સંપર્ક કરો",
      hero_btn_skills: "આવડત જુઓ",
      hero_chip: "નોબલ યુનિવર્સિટી • સેમેસ્ટર 3",
      photo_placeholder: "પ્રોફાઇલ ફોટો પ્લેસહોલ્ડર",
      about_tag: "મારા વિશે",
      about_title: "મારા વિશે",
      about_p1: "હું દેવ જેઠવા છું, નોબલ યુનિવર્સિટીમાં BCA નો વિદ્યાર્થી. હાલમાં વેબ ડેવલપમેન્ટ અને પ્રોગ્રામિંગનો પાયો મજબૂત કરી રહ્યો છું.",
      about_p2: "હું HTML, CSS, JavaScript, Java અને SQL શીખી રહ્યો છું, અને જે શીખું છું તેને વ્યવહારુ વેબસાઇટ્સમાં ફેરવવામાં રસ ધરાવું છું.",
      about_p3: "એક ફ્રેશર તરીકે, હું શીખવા, કુશળતા સુધારવા અને વાસ્તવિક દુનિયાના પ્રોજેક્ટ્સ પર કામ કરવાની તકો મેળવવા પર ધ્યાન केन्द्रित कर रहा हूँ.",
      meta_status: "વર્તમાન સ્થિતિ",
      meta_status_val: "BCA વિદ્યાર્થી અને ડેવલપર",
      meta_institution: "સંસ્થા",
      meta_focus: "મુખ્ય ધ્યાન",
      meta_focus_val: "પાયો મજબૂત કરવો",
      skills_tag: "કૌશલ્યો",
      skills_title: "મારી આવડત",
      skills_subtitle: "કોર પ્રોગ્રામિંગ ભાષાઓ અને ટેકનોલોજી જેનો હું અભ્યાસ કરી રહ્યો છું.",
      skill_html_desc: "સ્વચ્છ અને સુલભ વેબ પૃષ્ઠોનું માળખું બનાવવું.",
      skill_css_desc: "આધુનિક CSS સિદ્ધાંતો સાથે રિસ્પોન્સિવ લેઆઉટ ડિઝાઇન કરવા.",
      skill_js_desc: "વેબ તત્વોમાં ઇન્ટરેક્ટિવિટી ઉમેરવી.",
      skill_java_desc: "ઑબ્જેક્ટ-ઓરિએન્ટેડ પ્રોગ્રામિંગ સમજવું.",
      skill_sql_desc: "રિલેશનલ ડેટાબેઝ સાથે કામ કરવું.",
      exploring_title: "હાલમાં અભ્યાસ કરું છું",
      tag_backend: "બેકએન્ડ ડેવલપમેન્ટ",
      looking_tag: "તકો",
      looking_title: "હું શું શોધી રહ્યો છું",
      looking_subtitle: "હું એવી તકો શોધી રહ્યો છું જ્યાં હું વેબ ડેવલપમેન્ટમાં શીખી શકું અને વાસ્તવિક અનુભવ મેળવી શકું.",
      look1_title: "ઇન્ટર્નશિપ",
      look1_desc: "વ્યાવસાયિક અનુભવ મેળવવા માટે તકો શોધી રહ્યો છું.",
      look2_title: "ફ્રીલાન્સ તકો",
      look2_desc: "સામાન્ય વેબસાઇટ અને પોર્ટફોલિયો પ્રોજેક્ટ્સ માટે ખુલ્લો છું.",
      look3_title: "શીખવાની તકો",
      look3_desc: "સહયોગ કરવા અને વિકાસ કૌશલ્ય સુધારવામાં રસ ધરાવું છું.",
      projects_tag: "પોર્ટફોલિયો કાર્ય",
      projects_title: "પ્રોજેક્ટ્સ",
      projects_subtitle: "મારા શીખવાની સફર દરમિયાન બનાવેલા પ્રોજેક્ટ્સ.",
      empty_badge: "પ્રોજેક્ટ્સ જલ્દી આવી રહ્યા છે",
      empty_title: "મારા પ્રથમ પ્રોજેક્ટ્સનું નિર્માણ",
      empty_desc: "હું હાલમાં મારા પ્રથમ પ્રોજેક્ટ્સ બનાવવાનું કામ કરી રહ્યો છું. જેમ જેમ નવું કામ પૂર્ણ થશે તેમ આ વિભાગ અપડેટ થશે.",
      preview_1: "પ્રથમ પ્રોજેક્ટ ટૂંક સમયમાં...",
      preview_2: "વધુ પ્રોજેક્ટ્સ પ્રગતિમાં છે...",
      journey_tag: "ટાઇમલાઇન",
      journey_title: "મારી શીખવાની સફર",
      journey_subtitle: "હું પગલાં દર પગલાં મારા વિકાસનું આયોજન કેવી રીતે કરું છું.",
      j2024: "પ્રોગ્રામિંગ અને વેબ ડેવલપમેન્ટની શોધ શરૂ કરી.",
      j2025: "HTML, CSS, JavaScript, Java અને SQL શીખવાનું ચાલુ રાખ્યું.",
      j2026: "હાલમાં BCA કરી રહ્યો છું અને વ્યાવસાયિક વેબ ડેવલપર બનવા તરફ કામ કરી રહ્યો છું.",
      edu_tag: "શૈક્ષણિક પૃષ્ઠભૂમિ",
      edu_title: "શિક્ષણ",
      edu_term: "નોબલ યુનિવર્સિટી • સેમેસ્ટર 3",
      edu_badge: "હાલમાં ચાલુ",
      edu_desc: "સોફ્ટવેર સિદ્ધાંતો, અલ્ગોરિધમ્સ અને ડેટાબેઝ મેનેજમેન્ટમાં મજબૂત શૈક્ષણિક પાયો.",
      services_tag: "સેવાઓ",
      services_title: "હું શેમાં મદદ કરી શકું",
      services_subtitle: "શરૂઆત કરનારાઓ અને નાના પ્રોજેક્ટ્સ માટે સરળ વેબ ડેવલપમેન્ટ સહાય.",
      serv1_title: "બેઝિક વેબસાઇટ્સ",
      serv1_desc: "HTML, CSS અને JavaScript નો ઉપયોગ કરીને સરળ રિસ્પોન્સિવ વેબસાઇટ્સ.",
      serv2_title: "પોર્ટફોલિયો વેબસાઇટ્સ",
      serv2_desc: "વિદ્યાર્થીઓ, ફ્રીલાન્સર્સ અને શરૂઆત કરનારાઓ માટે વ્યક્તિગત પોર્ટફોલિયો વેબસાઇટ્સ.",
      serv3_title: "લેન્ડિંગ પેજીસ",
      serv3_desc: "સામાન્ય વિચારો અને પ્રોજેક્ટ્સ માટે સ્વચ્છ અને રિસ્પોન્સિવ લેન્ડિંગ પેજીસ.",
      contact_tag: "સંપર્ક કરો",
      contact_title: "સંપર્કમાં રહો",
      contact_subtitle: "હું હંમેશાં શીખવા, લોકો સાથે જોડવા અને નવી તકો શોધવામાં રસ ધરાવું છું. સીધો ફોન અને વોટ્સએપ એક્સેસ અનલૉક કરવા માટે નીચે વિગતો નોંધાવો.",
      inquiry_title: "प्रत्यक्ष વિગતો",
      inquiry_desc: "વિદ્યાર્થી સહયોગ, પૂછપરછ અથવા શીખવાની તકો માટે સંપર્ક કરો.",
      lbl_email_heading: "ઇમેઇल",
      lbl_mobile_wa: "મોબાઇલ અને વોટ્સએપ",
      val_locked_msg: "સુરક્ષા માટે લૉક છે (નીચે રજીસ્ટર કરો)",
      status_note: "BCA વિદ્યાર્થી • નોબલ યુનિવર્સિટી",
      banner_lock: "🔒 સુરક્ષા તપાસ",
      banner_desc: "વોટ્સએપ અને ફોન સંપર્ક અનલૉક કરવા માટે વિગતો દાખલ કરો.",
      lbl_name: "તમારું નામ *",
      lbl_email: "ઇમેઇલ સરનામું *",
      lbl_phone: "ફોન / વોટ્સએપ નંબર *",
      lbl_subject: "વિષય *",
      lbl_message: "સંદेश *",
      btn_submit_unlock: "રજીસ્ટર કરો અને વોટ્સએપ અનલૉક કરો",
      unlocked_access_badge: "મંજૂરી મળી",
      unlocked_heading: "રજીસ્ટ્રેશન થઈ ગયું!",
      unlocked_desc: "તમારી પૂછપરછ નોંધાઈ ગઈ છે. હવે તમે સીધા દેવ જેઠવા સાથે સંપર્ક કરી શકો છો:",
      unlocked_phone_tag: "સીધો કોલ:",
      unlocked_btn_wa: "વોટ્સએપ પર વાત કરો"
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
     2. TAB VISIBILITY TEASER
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
     3. LOGO SPIN ON CLICK
     ========================================================================= */
  const logoElement = document.querySelector('.logo');
  if (logoElement) {
    logoElement.addEventListener('click', () => {
      logoElement.classList.add('spin-animation');
      setTimeout(() => logoElement.classList.remove('spin-animation'), 650);
    });
  }

  /* =========================================================================
     4. THEME MANAGEMENT
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
     6. SCROLL PROGRESS
     ========================================================================= */
  let progressBar = document.querySelector('.scroll-progress-bar');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    document.body.prepend(progressBar);
  }

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  }, { passive: true });

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

  if (hamburger) hamburger.addEventListener('click', toggleMenu);
  navLinks.forEach((link) => link.addEventListener('click', () => { if (navMenu.classList.contains('active')) toggleMenu(); }));

  /* =========================================================================
     8. SCROLLSPY (FIXED ACTIVE NAV HIGHLIGHTING)
     ========================================================================= */
  const sections = document.querySelectorAll('section[id]');
  
  const scrollSpyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    root: null,
    // Triggers detection precisely when the section passes through the upper-middle area of the screen
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  });

  sections.forEach((section) => scrollSpyObserver.observe(section));

  /* =========================================================================
     9. DYNAMIC PROJECTS FETCHER (SUPABASE INTEGRATION)
     ========================================================================= */
  const SUPABASE_URL = 'https://nwvwrwwdtmejcqoanayv.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53dndyd3dkdG1lamNxb2FuYXl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5NjkyNDQsImV4cCI6MjEwNDU0NTI0NH0.hfDOvpxXzaPi80atyoXGX3P6boMmhrXXBPdMz7O5FxY';

  const fetchDynamicProjects = async () => {
    const dynamicContainer = document.getElementById('dynamic-projects-container');
    const emptyState = document.getElementById('projects-empty-state');
    if (!dynamicContainer) return;

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/projects?select=*`, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        }
      });
      if (response.ok) {
        const projects = await response.json();
        if (projects && projects.length > 0) {
          if (emptyState) emptyState.style.display = 'none';
          dynamicContainer.innerHTML = projects.map(p => `
            <div class="project-card glass-panel reveal active">
              <h3 class="project-name">${p.title || p.name}</h3>
              <p class="project-desc">${p.description || ''}</p>
            </div>
          `).join('');
        }
      }
    } catch (e) {
      // Keep empty state active if offline or table not present
    }
  };
  fetchDynamicProjects();

  /* =========================================================================
     10. SCROLL REVEAL OBSERVER
     ========================================================================= */
  const revealElements = document.querySelectorAll('.reveal');
  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach((el) => revealOnScroll.observe(el));

  /* =========================================================================
     11. CONTACT FORM & WHATSAPP UNLOCK
     ========================================================================= */
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
      return /^(?:\+91|91|0)?[6-9]\d{9}$/.test(cleaned) && !(/^(\d)\1{9}$/.test(cleaned.slice(-10)));
    };

    const showError = (input, errorId, msg) => {
      input.classList.add('input-error');
      const err = document.getElementById(errorId);
      if (err) err.textContent = msg;
    };
    const clearError = (input, errorId) => {
      input.classList.remove('input-error');
      const err = document.getElementById(errorId);
      if (err) err.textContent = '';
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

      if (!name) { showError(nameInput, 'name-error', 'Please enter your name'); hasErrors = true; }
      if (!email || !isValidEmail(email)) { showError(emailInput, 'email-error', 'Please enter a valid email'); hasErrors = true; }
      if (!rawPhone || !isValidPhone(rawPhone)) { showError(phoneInput, 'phone-error', 'Enter a valid 10-digit number'); hasErrors = true; }
      if (!subject) { showError(subjectInput, 'subject-error', 'Please enter a subject'); hasErrors = true; }
      if (!message) { showError(messageInput, 'message-error', 'Please enter a message'); hasErrors = true; }

      if (hasErrors) return;

      const formattedPhone = `+91 ${rawPhone.replace(/\D/g, '').slice(-10)}`;
      const originalText = submitBtn.querySelector('.btn-text').textContent;
      submitBtn.disabled = true;
      submitBtn.querySelector('.btn-text').textContent = 'Verifying...';

      try {
        const emailMsg = `📞 Mobile: ${formattedPhone}\n👤 Name: ${name}\n✉️ Email: ${email}\n\n📝 Message:\n${message}`;

        await Promise.all([
          fetch(`${SUPABASE_URL}/rest/v1/queries`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': SUPABASE_ANON_KEY,
              'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
              'Prefer': 'return=representation'
            },
            body: JSON.stringify({ name, email, phone: formattedPhone, subject, message, is_read: false })
          }),
          fetch(FORMSPREE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ name, email, phone: formattedPhone, subject: `[${formattedPhone}] - ${subject}`, message: emailMsg, _replyto: email })
          })
        ]);

        const whatsappUrl = `https://wa.me/919408031778?text=${encodeURIComponent(`Hi Dev, I registered regarding "${subject}". My name is ${name}.`)}`;
        whatsappDirectBtn.setAttribute('href', whatsappUrl);

        if (phoneDisplayVal) {
          phoneDisplayVal.innerHTML = `<a href="tel:+919408031778" style="color: var(--accent-bright); font-weight: 700;">+91 94080 31778</a>`;
          phoneDisplayVal.classList.remove('security-locked-text');
        }

        if (phoneLockedItem) {
          const iconBox = phoneLockedItem.querySelector('.info-icon');
          if (iconBox) {
            iconBox.classList.add('unlocked');
            iconBox.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></svg>`;
          }
        }

        contactForm.style.display = 'none';
        unlockedBox.style.display = 'flex';

      } catch (err) {
        feedbackBox.className = 'form-feedback error';
        feedbackBox.textContent = 'Connection error. Please try again.';
      } finally {
        submitBtn.disabled = false;
        submitBtn.querySelector('.btn-text').textContent = originalText;
      }
    });
  }
});
