import { useState, useEffect } from "react";
import {
  Menu, X, ChevronDown, ArrowRight, Phone, Mail, MapPin,
  Users, Target, CheckCircle,
  BarChart2, Shield, Globe, Plus, Minus,
  Linkedin, Instagram, Facebook, Trophy, Zap, Building2,
  Clock, Send, UserCheck, Briefcase
} from "lucide-react";
import siaoLogo from "../assets/newlogo.png";
import ceoPhoto from "../assets/ceo.jpeg";
import aboutGraphic from "../assets/new.jpeg";

type Page =
  | "home" | "about" | "services" | "sports"
  | "contact" 
  | "faq" | "team" | "partners" | "consultation"
  | "privacy" | "terms" | "cookies" | "blog";

type Lang = "en" | "pt";
type LegalPageKey = "privacy" | "terms" | "cookies";
type LegalPageContent = {
  label: string;
  title: string;
  updated: string;
  intro: string;
  sections: Array<{
    heading: string;
    paragraphs: string[];
  }>;
};

// ─── DATA ────────────────────────────────────────────────────────────────────

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || "";

async function submitToFormspree(payload: Record<string, string>) {
  if (!FORMSPREE_ENDPOINT) {
    throw new Error("Missing VITE_FORMSPREE_ENDPOINT");
  }

  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Formspree submission failed");
  }
}

const TEAM = [
  {
    name: "Adetula Olabode",
    title: "Managing Director",
    bio: [
      "Adetula Olabode Harry is the Founder and Managing Director of Sião Sports Consulting and Management, bringing extensive experience in sports development, talent identification, athlete management, and international sports relations.",
      "With a strong passion for youth empowerment through sports, he has dedicated his career to creating opportunities for talented athletes to achieve their full potential both locally and internationally. His expertise spans sports consulting, football scouting, player development, sports administration, event management, and strategic business development within the sports industry.",
      "As a visionary leader, Adetula Olabode Harry has established valuable partnerships with sports organizations, football clubs, academies, and stakeholders across Africa and Europe. His commitment to excellence has contributed to the successful development of numerous sports initiatives aimed at discovering, nurturing, and promoting young talents.",
      "Under his leadership, Sião Sports Consulting and Management has grown into a trusted organization providing comprehensive services in sports management, athlete representation, career development, branding, sports events, and performance enhancement. He is particularly passionate about creating pathways for African athletes to access international opportunities while promoting professionalism, integrity, and sustainable growth within the sports ecosystem.",
      "Through innovation, strategic thinking, and a results-driven approach, Adetula Olabode Harry continues to inspire positive change in the sports industry, helping athletes, organizations, and communities achieve their goals and unlock their full potential.",
      "His vision remains centered on building a globally recognized platform that connects talent with opportunity, develops future champions, and contributes to the advancement of sports as a tool for social and economic development.",
    ],
    photo: ceoPhoto,
    expertise: ["SIAO Sport Consulting Agency","Sports Marketing","Athlete Management","International Placement"],
    location: "Portugal",
  }  
];

const FAQS = [
  {
    q: "How does an engagement with SIÃO SPORTS typically begin?",
    a: "We start with a no-obligation discovery call to understand your challenge. From there, we conduct a structured assessment and deliver a tailored proposal outlining scope, timeline, and commercial terms. Most engagements begin within 2–3 weeks of initial contact.",
  },
  {
    q: "What is the typical duration of a consulting engagement?",
    a: "It depends on complexity and scope. Diagnostic projects run 4–8 weeks. Full strategy engagements typically span 3–6 months. Ongoing advisory retainers are available on a quarterly or annual basis.",
  },
  {
    q: "How do you price your services?",
    a: "We offer project-based fixed fees, daily rate engagements, and retained advisory relationships. All commercial terms are agreed before any engagement begins—no ambiguity, no surprises.",
  },
  {
    q: "What industries do you specialize in?",
    a: "Our practice area is Sports Consulting. We serve professional and elite sports organizations, athletes, and growth-focused teams.",
  },
  {
    q: "What distinguishes SIÃO SPORTS from larger consulting firms?",
    a: "Senior-led delivery. At SIÃO SPORTS, the partner who wins the engagement does the work. You will not be handed off to junior analysts. We combine strategic thinking with operational depth and move at the speed our clients require.",
  },
  {
    q: "Do you offer ongoing advisory relationships?",
    a: "Yes. Many clients engage SIÃO SPORTS on a retained basis for ongoing board-level advisory, executive coaching, or market monitoring. These relationships are typically structured as quarterly or annual retainers.",
  },
  {
    q: "Can you work with early-stage organizations?",
    a: "Selectively. We take on early-stage clients where the strategic challenge is genuinely complex and the leadership team has the appetite to act decisively on what they hear. We are not the right fit for every stage.",
  },
];

const NAV_LINKS = [
  { label: "Home", page: "home" as Page },
  { label: "About", page: "about" as Page },
  { label: "Services", page: "services" as Page },
  { label: "Our Team", page: "team" as Page },
  { label: "Contact", page: "contact" as Page },
];

const SITE_URL = "https://siaosports.pt";
const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/sportlogo-header-B_Xw-cZY.jpeg`;

const PAGE_PATHS: Record<Page, string> = {
  home: "/",
  about: "/about",
  services: "/services",
  sports: "/sports-consulting",
  contact: "/contact",
  faq: "/faq",
  team: "/team",
  partners: "/partners",
  consultation: "/request-consultation",
  privacy: "/privacy-policy",
  terms: "/terms-of-use",
  cookies: "/cookie-policy",
  blog: "/insights",
};

const PATH_TO_PAGE = Object.fromEntries(
  Object.entries(PAGE_PATHS).map(([page, path]) => [path, page as Page])
) as Record<string, Page>;

const SEO_CONTENT: Record<Page, Record<Lang, { title: string; description: string; keywords: string }>> = {
  home: {
    en: {
      title: "SIÃO SPORTS | Sports Consulting, Athlete Management & Scouting in Portugal",
      description: "SIÃO SPORTS helps athletes, clubs, academies, and sports organizations with consulting, athlete management, scouting, international placement, branding, and performance development.",
      keywords: "sports consulting Portugal, athlete management, football scouting, international player placement, sports management agency, Sião Sports",
    },
    pt: {
      title: "SIÃO SPORTS | Consultoria Desportiva, Gestão de Atletas e Scouting em Portugal",
      description: "A SIÃO SPORTS apoia atletas, clubes, academias e organizações desportivas com consultoria, gestão de carreira, scouting, colocação internacional, branding e desenvolvimento de performance.",
      keywords: "consultoria desportiva Portugal, gestão de atletas, scouting futebol, colocação internacional de jogadores, agência de gestão desportiva, Sião Sports",
    },
  },
  about: {
    en: {
      title: "About SIÃO SPORTS | Sports Consulting and Management Agency",
      description: "Learn about Sião Sports Consulting and Management, a Portugal-based agency creating opportunities for athletes, clubs, academies, and sports organizations.",
      keywords: "about Sião Sports, sports consultancy Portugal, sports management agency, athlete development Portugal",
    },
    pt: {
      title: "Sobre a SIÃO SPORTS | Agência de Consultoria e Gestão Desportiva",
      description: "Conheça a Sião Sports Consulting and Management, uma agência sediada em Portugal que cria oportunidades para atletas, clubes, academias e organizações desportivas.",
      keywords: "sobre Sião Sports, consultoria desportiva Portugal, agência de gestão desportiva, desenvolvimento de atletas Portugal",
    },
  },
  services: {
    en: {
      title: "Sports Consulting Services | SIÃO SPORTS",
      description: "Explore sports consulting, athlete representation, scouting, legal advisory, event management, branding, media, and performance development services.",
      keywords: "sports consulting services, athlete representation, sports legal advisory, sports event management, sports branding",
    },
    pt: {
      title: "Serviços de Consultoria Desportiva | SIÃO SPORTS",
      description: "Explore serviços de consultoria desportiva, representação de atletas, scouting, assessoria jurídica, gestão de eventos, branding, mídia e desenvolvimento de performance.",
      keywords: "serviços de consultoria desportiva, representação de atletas, assessoria jurídica desportiva, gestão de eventos desportivos, branding desportivo",
    },
  },
  sports: {
    en: {
      title: "Sports Consulting Practice | Athlete Management, Scouting & Club Advisory",
      description: "Senior-led sports consulting for athlete development, talent identification, intermediation, club advisory, sports events, and performance systems.",
      keywords: "sports consulting practice, athlete management, football scouting, club advisory, talent identification",
    },
    pt: {
      title: "Consultoria Desportiva | Gestão de Atletas, Scouting e Assessoria a Clubes",
      description: "Consultoria desportiva liderada por profissionais seniores para desenvolvimento de atletas, identificação de talentos, intermediação, assessoria a clubes, eventos e performance.",
      keywords: "consultoria desportiva, gestão de atletas, scouting futebol, assessoria a clubes, identificação de talentos",
    },
  },
  contact: {
    en: {
      title: "Contact SIÃO SPORTS | Sports Consulting in Faro, Portugal",
      description: "Contact SIÃO SPORTS in Faro, Portugal for athlete management, sports consulting, scouting, international placement, branding, and advisory enquiries.",
      keywords: "contact SIÃO SPORTS, sports consulting Faro, athlete management Portugal contact",
    },
    pt: {
      title: "Contacte a SIÃO SPORTS | Consultoria Desportiva em Faro, Portugal",
      description: "Contacte a SIÃO SPORTS em Faro, Portugal para gestão de atletas, consultoria desportiva, scouting, colocação internacional, branding e assessoria.",
      keywords: "contactar SIÃO SPORTS, consultoria desportiva Faro, gestão de atletas Portugal contacto",
    },
  },
  faq: {
    en: {
      title: "Sports Consulting FAQ | SIÃO SPORTS",
      description: "Find answers about how SIÃO SPORTS engagements begin, typical timelines, pricing models, advisory relationships, and sports consulting services.",
      keywords: "sports consulting FAQ, athlete management questions, consulting engagement Portugal",
    },
    pt: {
      title: "FAQ de Consultoria Desportiva | SIÃO SPORTS",
      description: "Encontre respostas sobre como começam os projetos da SIÃO SPORTS, prazos, modelos de preço, assessoria contínua e serviços de consultoria desportiva.",
      keywords: "FAQ consultoria desportiva, perguntas gestão de atletas, projeto de consultoria Portugal",
    },
  },
  team: {
    en: {
      title: "Our Team | SIÃO SPORTS Leadership",
      description: "Meet the leadership behind SIÃO SPORTS and its work in sports consulting, athlete management, scouting, and international sports relations.",
      keywords: "SIÃO SPORTS team, Adetula Olabode, sports consulting leadership, athlete management Portugal",
    },
    pt: {
      title: "Nossa Equipe | Liderança da SIÃO SPORTS",
      description: "Conheça a liderança da SIÃO SPORTS e o seu trabalho em consultoria desportiva, gestão de atletas, scouting e relações desportivas internacionais.",
      keywords: "equipe SIÃO SPORTS, Adetula Olabode, liderança consultoria desportiva, gestão de atletas Portugal",
    },
  },
  partners: {
    en: {
      title: "Partners and Clients | SIÃO SPORTS",
      description: "SIÃO SPORTS works with professional clubs, sports academies, player representatives, and community sport programs.",
      keywords: "sports partners, football academies, professional clubs, player representatives",
    },
    pt: {
      title: "Parceiros e Clientes | SIÃO SPORTS",
      description: "A SIÃO SPORTS trabalha com clubes profissionais, academias desportivas, representantes de jogadores e programas comunitários de desporto.",
      keywords: "parceiros desportivos, academias de futebol, clubes profissionais, representantes de jogadores",
    },
  },
  consultation: {
    en: {
      title: "Request a Sports Consulting Consultation | SIÃO SPORTS",
      description: "Request a consultation with SIÃO SPORTS for athlete management, scouting, sports advisory, branding, events, or international placement support.",
      keywords: "request sports consultation, athlete management consultation, scouting consultation Portugal",
    },
    pt: {
      title: "Solicitar Consulta de Consultoria Desportiva | SIÃO SPORTS",
      description: "Solicite uma consulta com a SIÃO SPORTS para gestão de atletas, scouting, assessoria desportiva, branding, eventos ou apoio à colocação internacional.",
      keywords: "solicitar consultoria desportiva, consulta gestão de atletas, consulta scouting Portugal",
    },
  },
  privacy: {
    en: {
      title: "Privacy Policy | SIÃO SPORTS",
      description: "Read how SIÃO SPORTS collects, uses, shares, and protects personal information when you use the website or contact the agency.",
      keywords: "SIÃO SPORTS privacy policy, data protection, privacy Portugal",
    },
    pt: {
      title: "Política de Privacidade | SIÃO SPORTS",
      description: "Leia como a SIÃO SPORTS recolhe, utiliza, partilha e protege dados pessoais quando utiliza o website ou contacta a agência.",
      keywords: "política de privacidade SIÃO SPORTS, proteção de dados, privacidade Portugal",
    },
  },
  terms: {
    en: {
      title: "Terms of Use | SIÃO SPORTS",
      description: "Read the terms governing access to and use of the SIÃO SPORTS website.",
      keywords: "SIÃO SPORTS terms of use, website terms, legal terms",
    },
    pt: {
      title: "Termos de Uso | SIÃO SPORTS",
      description: "Leia os termos que regulam o acesso e a utilização do website da SIÃO SPORTS.",
      keywords: "termos de uso SIÃO SPORTS, termos do website, termos legais",
    },
  },
  cookies: {
    en: {
      title: "Cookie Policy | SIÃO SPORTS",
      description: "Learn how SIÃO SPORTS may use cookies and similar technologies on the website.",
      keywords: "SIÃO SPORTS cookie policy, cookies, website privacy",
    },
    pt: {
      title: "Política de Cookies | SIÃO SPORTS",
      description: "Saiba como a SIÃO SPORTS pode utilizar cookies e tecnologias semelhantes no website.",
      keywords: "política de cookies SIÃO SPORTS, cookies, privacidade website",
    },
  },
  blog: {
    en: {
      title: "Sports Consulting Insights | SIÃO SPORTS",
      description: "Insights and analysis from SIÃO SPORTS on athlete development, sports management, scouting, and performance strategy.",
      keywords: "sports consulting insights, athlete development articles, sports management strategy",
    },
    pt: {
      title: "Insights de Consultoria Desportiva | SIÃO SPORTS",
      description: "Insights e análises da SIÃO SPORTS sobre desenvolvimento de atletas, gestão desportiva, scouting e estratégia de performance.",
      keywords: "insights consultoria desportiva, artigos desenvolvimento de atletas, estratégia de gestão desportiva",
    },
  },
};

const LEGAL_PAGES: Record<LegalPageKey, LegalPageContent> = {
  privacy: {
    label: "Privacy Policy",
    title: "Privacy Policy",
    updated: "Last updated: June 27, 2026",
    intro:
      "This Privacy Policy explains how Sião Sports Consulting and Management collects, uses, shares, and protects personal information when you visit our website, contact us, request a consultation, or engage our services.",
    sections: [
      {
        heading: "Who we are",
        paragraphs: [
          "Sião Sports Consulting and Management is a sports consulting and management agency based in Portugal. For privacy questions, you can contact us at siaosportscm@gmail.com or by post at Estrada Vale de Eguas, 78, Bloco A Rc Dto, 8135-033 Almancil, Loule, Faro, Portugal.",
        ],
      },
      {
        heading: "Information we collect",
        paragraphs: [
          "We collect information you choose to provide, such as your name, email address, phone number, organization, service area, timeline, and the details you include in contact or consultation forms.",
          "We may also collect basic technical information when you use the website, including device type, browser type, approximate location, pages viewed, referral source, and cookie or similar identifier data.",
        ],
      },
      {
        heading: "How we use information",
        paragraphs: [
          "We use personal information to respond to enquiries, assess consultation requests, provide services, manage client relationships, improve the website, protect our business, comply with legal obligations, and keep appropriate business records.",
          "We do not sell personal information. We only use it for legitimate business purposes connected to our consulting, athlete management, scouting, event, branding, and advisory services.",
        ],
      },
      {
        heading: "Legal bases",
        paragraphs: [
          "Where applicable data protection law applies, we rely on consent, contract performance, legitimate interests, and legal obligations as the legal bases for processing personal information.",
        ],
      },
      {
        heading: "Service providers and transfers",
        paragraphs: [
          "We may share information with trusted providers who help us operate the website, process form submissions, manage communications, host data, or support professional services. These providers must handle information only for the services they provide to us.",
          "Some providers may process information outside Portugal or the European Economic Area. Where required, we use appropriate safeguards for international transfers.",
        ],
      },
      {
        heading: "Retention",
        paragraphs: [
          "We keep personal information only for as long as needed for the purpose collected, including responding to your request, managing an engagement, meeting legal or accounting requirements, resolving disputes, and maintaining business records.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: [
          "Depending on your location, you may have rights to access, correct, delete, restrict, object to, or receive a copy of your personal information. You may also withdraw consent where processing is based on consent.",
          "To exercise a privacy right, contact us at siaosportscm@gmail.com. We may need to verify your identity before acting on a request.",
        ],
      },
      {
        heading: "Security",
        paragraphs: [
          "We use reasonable administrative, technical, and organizational measures to protect personal information. No website or internet transmission is completely secure, so we cannot guarantee absolute security.",
        ],
      },
      {
        heading: "Changes to this policy",
        paragraphs: [
          "We may update this Privacy Policy from time to time. The updated version will be posted on this website with a revised date.",
        ],
      },
    ],
  },
  terms: {
    label: "Terms of Use",
    title: "Terms of Use",
    updated: "Last updated: June 27, 2026",
    intro:
      "These Terms of Use govern your access to and use of the Sião Sports Consulting and Management website. By using this website, you agree to these terms.",
    sections: [
      {
        heading: "Website purpose",
        paragraphs: [
          "This website provides general information about our sports consulting, athlete management, scouting, intermediation, event, branding, and advisory services. The content is provided for informational purposes only and does not create a client, agency, representation, partnership, or employment relationship.",
        ],
      },
      {
        heading: "Use of the website",
        paragraphs: [
          "You agree to use the website lawfully and respectfully. You must not interfere with website operation, attempt unauthorized access, submit malicious code, scrape content at scale, impersonate another person, or use the website to send unlawful, misleading, or harmful material.",
        ],
      },
      {
        heading: "Consultation requests",
        paragraphs: [
          "Submitting a contact form or consultation request does not guarantee acceptance, representation, placement, club signing, investment outcome, commercial result, or any specific opportunity. Any engagement is subject to separate written terms agreed by both parties.",
        ],
      },
      {
        heading: "Intellectual property",
        paragraphs: [
          "The website content, branding, layout, text, images, graphics, and other materials are owned by or licensed to Sião Sports Consulting and Management unless otherwise stated. You may view the website for personal or internal business purposes, but you may not copy, reproduce, modify, distribute, or commercially exploit content without permission.",
        ],
      },
      {
        heading: "Third-party links",
        paragraphs: [
          "The website may include links to third-party websites or social media pages. We are not responsible for third-party content, availability, security, or privacy practices.",
        ],
      },
      {
        heading: "No warranties",
        paragraphs: [
          "The website is provided on an as-is and as-available basis. We aim to keep information accurate and current, but we do not warrant that the website will be uninterrupted, error-free, secure, or free of harmful components.",
        ],
      },
      {
        heading: "Limitation of liability",
        paragraphs: [
          "To the fullest extent permitted by law, Sião Sports Consulting and Management will not be liable for indirect, incidental, consequential, special, punitive, or loss-of-profit damages arising from your use of the website.",
        ],
      },
      {
        heading: "Governing law",
        paragraphs: [
          "These terms are governed by the laws of Portugal, without prejudice to any mandatory consumer or data protection rights that may apply in your location.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          "Questions about these Terms of Use can be sent to siaosportscm@gmail.com.",
        ],
      },
    ],
  },
  cookies: {
    label: "Cookie Policy",
    title: "Cookie Policy",
    updated: "Last updated: June 27, 2026",
    intro:
      "This Cookie Policy explains how Sião Sports Consulting and Management may use cookies and similar technologies on this website.",
    sections: [
      {
        heading: "What cookies are",
        paragraphs: [
          "Cookies are small text files placed on your device when you visit a website. Similar technologies, such as local storage or pixels, may also store or access information on your device.",
        ],
      },
      {
        heading: "Types of cookies we may use",
        paragraphs: [
          "Strictly necessary cookies support core website functions such as security, page navigation, form handling, and language preferences.",
          "Analytics cookies help us understand how visitors use the website, which pages are viewed, and how the website can be improved.",
          "Third-party cookies may be set by embedded tools, form providers, hosting services, analytics services, maps, videos, or social media links where those features are used.",
        ],
      },
      {
        heading: "How we use cookies",
        paragraphs: [
          "We use cookies and similar technologies to operate the website, remember basic preferences, improve performance, measure engagement, protect the website, and understand which content is useful to visitors.",
        ],
      },
      {
        heading: "Managing cookies",
        paragraphs: [
          "You can control cookies through your browser settings. Most browsers allow you to block, delete, or limit cookies. If you block certain cookies, some website features may not work correctly.",
          "Where a consent tool is available on the website, you can use it to manage non-essential cookie preferences.",
        ],
      },
      {
        heading: "Third-party responsibility",
        paragraphs: [
          "Third-party services may use their own cookies or similar technologies. Their use is governed by their own privacy and cookie notices, not this policy.",
        ],
      },
      {
        heading: "Updates",
        paragraphs: [
          "We may update this Cookie Policy as our website and services change. The latest version will be posted on this page.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          "For questions about cookies or privacy, contact us at siaosportscm@gmail.com.",
        ],
      },
    ],
  },
};

const LEGAL_PAGES_PT: Record<LegalPageKey, LegalPageContent> = {
  privacy: {
    label: "Política de Privacidade",
    title: "Política de Privacidade",
    updated: "Última atualização: 27 de junho de 2026",
    intro:
      "Esta Política de Privacidade explica como a Sião Sports Consulting and Management recolhe, utiliza, partilha e protege dados pessoais quando visita o nosso website, entra em contacto connosco, solicita uma consulta ou contrata os nossos serviços.",
    sections: [
      {
        heading: "Quem somos",
        paragraphs: [
          "A Sião Sports Consulting and Management é uma agência de consultoria e gestão desportiva sediada em Portugal. Para questões de privacidade, pode contactar-nos através de siaosportscm@gmail.com ou por correio para Estrada Vale de Eguas, 78, Bloco A Rc Dto, 8135-033 Almancil, Loule, Faro, Portugal.",
        ],
      },
      {
        heading: "Informações que recolhemos",
        paragraphs: [
          "Recolhemos as informações que decide fornecer, como nome, endereço de email, número de telefone, organização, área de serviço, prazo previsto e os detalhes incluídos nos formulários de contacto ou pedido de consulta.",
          "Também podemos recolher informações técnicas básicas quando utiliza o website, incluindo tipo de dispositivo, tipo de navegador, localização aproximada, páginas visualizadas, origem da visita e dados de cookies ou identificadores semelhantes.",
        ],
      },
      {
        heading: "Como utilizamos as informações",
        paragraphs: [
          "Utilizamos dados pessoais para responder a pedidos, avaliar solicitações de consulta, prestar serviços, gerir relações com clientes, melhorar o website, proteger o nosso negócio, cumprir obrigações legais e manter registos comerciais adequados.",
          "Não vendemos dados pessoais. Utilizamos essas informações apenas para fins comerciais legítimos relacionados com os nossos serviços de consultoria, gestão de atletas, scouting, eventos, branding e assessoria.",
        ],
      },
      {
        heading: "Bases legais",
        paragraphs: [
          "Quando a legislação de proteção de dados aplicável assim o exigir, tratamos dados pessoais com base no consentimento, execução de contrato, interesses legítimos e cumprimento de obrigações legais.",
        ],
      },
      {
        heading: "Prestadores de serviços e transferências",
        paragraphs: [
          "Podemos partilhar informações com prestadores de serviços de confiança que nos ajudam a operar o website, processar formulários, gerir comunicações, alojar dados ou apoiar serviços profissionais. Esses prestadores devem tratar as informações apenas para os serviços que nos prestam.",
          "Alguns prestadores podem tratar informações fora de Portugal ou do Espaço Económico Europeu. Quando exigido, utilizamos salvaguardas adequadas para transferências internacionais.",
        ],
      },
      {
        heading: "Conservação",
        paragraphs: [
          "Mantemos dados pessoais apenas durante o tempo necessário para a finalidade para a qual foram recolhidos, incluindo responder ao seu pedido, gerir uma contratação, cumprir requisitos legais ou contabilísticos, resolver litígios e manter registos comerciais.",
        ],
      },
      {
        heading: "Os seus direitos",
        paragraphs: [
          "Dependendo da sua localização, poderá ter direitos de acesso, retificação, eliminação, limitação, oposição ou portabilidade dos seus dados pessoais. Também poderá retirar o consentimento quando o tratamento se basear no consentimento.",
          "Para exercer um direito de privacidade, contacte-nos através de siaosportscm@gmail.com. Poderemos ter de verificar a sua identidade antes de responder ao pedido.",
        ],
      },
      {
        heading: "Segurança",
        paragraphs: [
          "Utilizamos medidas administrativas, técnicas e organizacionais razoáveis para proteger dados pessoais. Nenhum website ou transmissão pela internet é totalmente seguro, pelo que não podemos garantir segurança absoluta.",
        ],
      },
      {
        heading: "Alterações a esta política",
        paragraphs: [
          "Podemos atualizar esta Política de Privacidade periodicamente. A versão atualizada será publicada neste website com uma nova data de revisão.",
        ],
      },
    ],
  },
  terms: {
    label: "Termos de Uso",
    title: "Termos de Uso",
    updated: "Última atualização: 27 de junho de 2026",
    intro:
      "Estes Termos de Uso regulam o seu acesso e utilização do website da Sião Sports Consulting and Management. Ao utilizar este website, concorda com estes termos.",
    sections: [
      {
        heading: "Finalidade do website",
        paragraphs: [
          "Este website fornece informações gerais sobre os nossos serviços de consultoria desportiva, gestão de atletas, scouting, intermediação, eventos, branding e assessoria. O conteúdo é disponibilizado apenas para fins informativos e não cria uma relação de cliente, agência, representação, parceria ou emprego.",
        ],
      },
      {
        heading: "Utilização do website",
        paragraphs: [
          "Concorda em utilizar o website de forma legal e respeitosa. Não deve interferir com o funcionamento do website, tentar acesso não autorizado, enviar código malicioso, recolher conteúdo em escala, fazer-se passar por outra pessoa ou utilizar o website para enviar material ilegal, enganoso ou prejudicial.",
        ],
      },
      {
        heading: "Pedidos de consulta",
        paragraphs: [
          "O envio de um formulário de contacto ou pedido de consulta não garante aceitação, representação, colocação, assinatura com clube, resultado de investimento, resultado comercial ou qualquer oportunidade específica. Qualquer contratação estará sujeita a termos escritos separados acordados por ambas as partes.",
        ],
      },
      {
        heading: "Propriedade intelectual",
        paragraphs: [
          "O conteúdo, marca, layout, textos, imagens, gráficos e outros materiais do website pertencem ou são licenciados à Sião Sports Consulting and Management, salvo indicação em contrário. Pode visualizar o website para fins pessoais ou internos de negócio, mas não pode copiar, reproduzir, modificar, distribuir ou explorar comercialmente o conteúdo sem autorização.",
        ],
      },
      {
        heading: "Links de terceiros",
        paragraphs: [
          "O website pode incluir links para websites de terceiros ou páginas de redes sociais. Não somos responsáveis pelo conteúdo, disponibilidade, segurança ou práticas de privacidade de terceiros.",
        ],
      },
      {
        heading: "Sem garantias",
        paragraphs: [
          "O website é fornecido tal como está e conforme disponível. Procuramos manter as informações corretas e atuais, mas não garantimos que o website seja ininterrupto, livre de erros, seguro ou livre de componentes prejudiciais.",
        ],
      },
      {
        heading: "Limitação de responsabilidade",
        paragraphs: [
          "Na medida máxima permitida por lei, a Sião Sports Consulting and Management não será responsável por danos indiretos, incidentais, consequenciais, especiais, punitivos ou por perda de lucros decorrentes da utilização do website.",
        ],
      },
      {
        heading: "Lei aplicável",
        paragraphs: [
          "Estes termos são regidos pelas leis de Portugal, sem prejuízo de quaisquer direitos obrigatórios de consumidor ou proteção de dados que possam aplicar-se na sua localização.",
        ],
      },
      {
        heading: "Contacto",
        paragraphs: [
          "Questões sobre estes Termos de Uso podem ser enviadas para siaosportscm@gmail.com.",
        ],
      },
    ],
  },
  cookies: {
    label: "Política de Cookies",
    title: "Política de Cookies",
    updated: "Última atualização: 27 de junho de 2026",
    intro:
      "Esta Política de Cookies explica como a Sião Sports Consulting and Management pode utilizar cookies e tecnologias semelhantes neste website.",
    sections: [
      {
        heading: "O que são cookies",
        paragraphs: [
          "Cookies são pequenos ficheiros de texto colocados no seu dispositivo quando visita um website. Tecnologias semelhantes, como armazenamento local ou pixels, também podem guardar ou aceder a informações no seu dispositivo.",
        ],
      },
      {
        heading: "Tipos de cookies que podemos utilizar",
        paragraphs: [
          "Cookies estritamente necessários apoiam funções essenciais do website, como segurança, navegação, processamento de formulários e preferências de idioma.",
          "Cookies de análise ajudam-nos a compreender como os visitantes utilizam o website, que páginas são visualizadas e como o website pode ser melhorado.",
          "Cookies de terceiros podem ser definidos por ferramentas incorporadas, fornecedores de formulários, serviços de alojamento, serviços de análise, mapas, vídeos ou links de redes sociais quando essas funcionalidades são utilizadas.",
        ],
      },
      {
        heading: "Como utilizamos cookies",
        paragraphs: [
          "Utilizamos cookies e tecnologias semelhantes para operar o website, recordar preferências básicas, melhorar o desempenho, medir interação, proteger o website e compreender que conteúdo é útil para os visitantes.",
        ],
      },
      {
        heading: "Gerir cookies",
        paragraphs: [
          "Pode controlar cookies através das definições do seu navegador. A maioria dos navegadores permite bloquear, eliminar ou limitar cookies. Se bloquear determinados cookies, algumas funcionalidades do website podem não funcionar corretamente.",
          "Quando uma ferramenta de consentimento estiver disponível no website, pode utilizá-la para gerir preferências de cookies não essenciais.",
        ],
      },
      {
        heading: "Responsabilidade de terceiros",
        paragraphs: [
          "Serviços de terceiros podem utilizar os seus próprios cookies ou tecnologias semelhantes. Essa utilização é regida pelos seus próprios avisos de privacidade e cookies, não por esta política.",
        ],
      },
      {
        heading: "Atualizações",
        paragraphs: [
          "Podemos atualizar esta Política de Cookies à medida que o nosso website e os nossos serviços mudam. A versão mais recente será publicada nesta página.",
        ],
      },
      {
        heading: "Contacto",
        paragraphs: [
          "Para questões sobre cookies ou privacidade, contacte-nos através de siaosportscm@gmail.com.",
        ],
      },
    ],
  },
};

const PARTNERS = [
  "Professional Clubs",
  "Sports Academies",
  "Player Representatives",
  "Community Sport Programs",
];

const PT_TRANSLATIONS: Record<string, string> = {
  Home: "Início",
  About: "Sobre",
  Services: "Serviços",
  "Sports Consulting": "Consultoria Esportiva",
  "Our Team": "Nossa Equipe",
  Contact: "Contato",
  Partners: "Parceiros",
  Careers: "Carreiras",
  "Request Consultation": "Solicitar Consultoria",
  "Request a Consultation": "Solicitar uma Consultoria",
  "Our Services": "Nossos Serviços",
  SCROLL: "ROLAR",
  "Strategy · Sports · Management": "Estratégia · Esportes · Gestão",
  "Where Strategy": "Onde a estratégia",
  Meets: "encontra",
  Results: "resultados",
  "Senior-led consulting for sports organizations, enterprises, and management teams who demand more than a report. We deliver transformation.": "Consultoria liderada por sócios para organizações esportivas, empresas e equipes de gestão que esperam mais do que um relatório. Entregamos transformação.",
  "Years of senior-led practice": "Anos de prática liderada por sócios",
  "Clients across 3 continents": "Clientes em 3 continentes",
  "Enterprise value advised": "Valor empresarial assessorado",
  "Full-time advisors": "Consultores em tempo integral",
  "Our Practice Areas": "Nossas Áreas de Atuação",
  "Three disciplines.": "Três disciplinas.",
  "One standard of excellence.": "Um único padrão de excelência.",
  "SIÃO SPORTS operates at the intersection of elite sports, corporate strategy, and organizational excellence—bringing the same rigour to every engagement regardless of industry or size.": "A SIÃO SPORTS atua na interseção entre esporte de elite, estratégia corporativa e excelência organizacional, levando o mesmo rigor a cada projeto, independentemente do setor ou porte.",
  "At SIAO Sport Consulting Agency, we offer a wide range of specialized services designed to support athletes, sports organizations, and brands in achieving excellence and sustainable growth.": "Na SIAO Sport Consulting Agency, oferecemos uma ampla gama de serviços especializados para apoiar atletas, organizações esportivas e marcas na busca por excelência e crescimento sustentável.",
  "Franchise strategy, athlete management, commercial optimization, and performance analytics for elite sports organizations.": "Estratégia de franquias, gestão de atletas, otimização comercial e análise de desempenho para organizações esportivas de elite.",
  "Corporate strategy, M&A advisory, market entry, and operational transformation for mid-market and enterprise clients.": "Estratégia corporativa, assessoria em fusões e aquisições, entrada em mercados e transformação operacional para empresas médias e grandes.",
  "Executive talent, organizational design, project governance, and leadership development for high-performance teams.": "Talentos executivos, desenho organizacional, governança de projetos e desenvolvimento de liderança para equipes de alta performance.",
  "Athlete Representation & Management": "Representação e Gestão de Atletas",
  "We provide professional representation, contract negotiation, and career management services, ensuring athletes are well-positioned for success both on and off the field.": "Oferecemos representação profissional, negociação de contratos e gestão de carreira, garantindo que os atletas estejam bem posicionados para o sucesso dentro e fora de campo.",
  "Talent Identification & Scouting": "Identificação de Talentos e Observação",
  "We identify and nurture promising talents, connecting them with the right opportunities, clubs, and platforms to advance their careers.": "Identificamos e desenvolvemos talentos promissores, conectando-os às oportunidades, clubes e plataformas certas para avançar em suas carreiras.",
  "Career Development & Advisory": "Desenvolvimento de Carreira e Assessoria",
  "We guide athletes through every stage of their careers with personalized strategies, mentorship, and long-term planning.": "Orientamos atletas em cada etapa de suas carreiras com estratégias personalizadas, mentoria e planejamento de longo prazo.",
  "Learn more": "Saiba mais",
  "International Placement & European Club Signing": "Colocação Internacional e Assinatura com Clube Europeu",
  "We Secured a successful international transfer by facilitating a European club signing, significantly elevating the player’s career, exposure, and earning potential.": "Garantimos uma transferência internacional bem-sucedida ao facilitar a assinatura com um clube europeu, elevando significativamente a carreira, a visibilidade e o potencial de ganhos do jogador.",
  "+34% Revenue Growth for a Premier League Club": "+34% de crescimento de receita para um clube da Premier League",
  "We redesigned the end-to-end commercial strategy for a top-flight English club—sponsorship architecture, digital fan engagement, and international market development—delivering measurable results in 18 months.": "Redesenhamos a estratégia comercial completa de um clube inglês de primeira divisão, da arquitetura de patrocínios ao engajamento digital de torcedores e ao desenvolvimento internacional de mercado, gerando resultados mensuráveis em 18 meses.",
  "Players placed internationally": "Jogadores colocados internacionalmente",
  "Clubs Engaged": "Clubes envolvidos",
  "Placement Timeline": "Prazo de colocação",
  "Stadium at night": "Estádio à noite",
  "Revenue increase": "Aumento de receita",
  "Engagement duration": "Duração do projeto",
  "New sponsorship secured": "Novo patrocínio fechado",
  "Ready to transform your organization?": "Pronto para transformar sua organização?",
  "Start with a no-obligation discovery call.": "Comece com uma chamada inicial sem compromisso.",
  "About SIÃO SPORTS": "Sobre a SIÃO SPORTS",
  "Built on conviction.": "Construída com convicção.",
  Measured: "Medida",
  "by results.": "por resultados.",
  "Our Story": "Nossa História",
  "Founded in 2008. Senior-led from day one.": "Fundada em 2008. Liderada por sócios desde o primeiro dia.",
  "Founded in 2025. Senior-led from day one.": "Fundada em 2025. Liderada por sócios desde o primeiro dia.",
  "SIÃO SPORTS was founded by James Harrington following his departure from McKinsey's Corporate Finance practice, with a clear conviction: the most complex strategic challenges deserve partners who stay in the room—not associates who present and leave.": "A SIÃO SPORTS foi fundada por James Harrington após sua saída da área de Corporate Finance da McKinsey, com uma convicção clara: os desafios estratégicos mais complexos merecem parceiros que permaneçam na sala, não consultores juniores que apresentam e saem.",
  "Founded on the principles of excellence, integrity, and professionalism, SIAO Sport Consulting Agency serves as a trusted partner in navigating the dynamic world of sports. Our expertise spans athlete representation, career development, sports marketing, talent scouting, and organizational advisory services. We are committed to identifying opportunities, building strong networks, and delivering tailored strategies that create lasting value.": "Fundada com base nos princípios de excelência, integridade e profissionalismo, a SIAO Sport Consulting Agency atua como parceira confiável na navegação pelo dinâmico mundo dos esportes. Nossa expertise abrange representação de atletas, desenvolvimento de carreira, marketing esportivo, identificação de talentos e serviços de assessoria organizacional. Estamos comprometidos em identificar oportunidades, construir redes sólidas e entregar estratégias personalizadas que gerem valor duradouro.",
  "From a two-person advisory boutique in New York, we've grown to 38 full-time advisors across three global offices, with specialist practices in sports, business strategy, and management—all united by the same commitment to senior-led delivery and measurable outcomes.": "De uma boutique de consultoria com duas pessoas em Nova York, crescemos para 38 consultores em tempo integral em três escritórios globais, com práticas especializadas em esportes, estratégia empresarial e gestão, todas unidas pelo compromisso com entrega liderada por sócios e resultados mensuráveis.",
  "At SIAO Sport Consulting Agency, we are driven by a passion for sports development, talent management, and strategic growth within the global sports industry. We specialize in providing innovative consulting solutions that empower athletes, sports organizations, and stakeholders to reach their highest potential both on and off the field.": "Na SIAO Sport Consulting Agency, somos movidos pela paixão pelo desenvolvimento esportivo, gestão de talentos e crescimento estratégico na indústria esportiva global. Somos especializados em oferecer soluções de consultoria inovadoras que capacitam atletas, organizações esportivas e stakeholders a alcançar seu maior potencial dentro e fora de campo.",
  "Today, SIÃO SPORTS works with Premier League clubs, Fortune 500 companies, Olympic federations, private equity firms, and family-owned enterprises. The through-line is always the same: we bring the best thinking to the hardest problems, and we stay until the work is done.": "Hoje, a SIÃO SPORTS trabalha com clubes da Premier League, empresas Fortune 500, federações olímpicas, fundos de private equity e empresas familiares. O fio condutor é sempre o mesmo: levamos o melhor pensamento aos problemas mais difíceis e permanecemos até o trabalho estar concluído.",
  "We believe that every athlete and sports brand has a unique story and potential. Our mission is to nurture that potential by offering guidance, exposure, and the right platform for success. Through a combination of industry knowledge, data-driven insights, and a deep understanding of the sports ecosystem, we help our clients make informed decisions and achieve sustainable growth.": "Acreditamos que todo atleta e marca esportiva tem uma história e um potencial únicos. Nossa missão é nutrir esse potencial oferecendo orientação, visibilidade e a plataforma certa para o sucesso. Por meio de uma combinação de conhecimento do setor, insights baseados em dados e uma compreensão profunda do ecossistema esportivo, ajudamos nossos clientes a tomar decisões informadas e alcançar crescimento sustentável.",
  "At SIAO Sport Consulting Agency, we don’t just manage careers — we build legacies.": "Na SIAO Sport Consulting Agency, não apenas gerenciamos carreiras — construímos legados.",
  "Year Founded": "Ano de fundação",
  "Our Mission": "Nossa Missão",
  "Our Vision": "Nossa Visão",
  "TAt Sião Sports Consulting and Management, our vision is to become a globally recognized leader in sports consulting, talent development, scouting, intermediation, and career management. We are committed to creating opportunities, building lasting partnerships, and developing future champions who will make a positive impact both on and off the field.": "Ser a consultoria mais confiável para organizações que competem nos níveis mais altos do esporte, dos negócios e da gestão no mundo todo.",
  "Core Values": "Valores Essenciais",
  "How we show up, every engagement.": "Como nos apresentamos em cada projeto.",
  Integrity: "Integridade",
  "We say what we believe, even when it's uncomfortable. Our counsel is independent of the outcome we think you want to hear.": "Dizemos o que acreditamos, mesmo quando é desconfortável. Nosso aconselhamento é independente do resultado que achamos que você gostaria de ouvir.",
  Pace: "Ritmo",
  "Strategy without speed is philosophy. We move at the velocity our clients need, without sacrificing analytical depth.": "Estratégia sem velocidade é filosofia. Avançamos no ritmo que nossos clientes precisam, sem sacrificar a profundidade analítica.",
  Accountability: "Responsabilidade",
  "We measure ourselves by outcomes, not outputs. Our engagement doesn't end at the deck—it ends when the work has landed.": "Medimos nosso trabalho por resultados, não por entregáveis. O projeto não termina na apresentação, termina quando o trabalho gera impacto.",
  Precision: "Precisão",
  "Every recommendation is grounded in evidence. We don't trade in intuition alone—we back it with data, rigor, and experience.": "Cada recomendação é baseada em evidências. Não trabalhamos apenas com intuição; sustentamos tudo com dados, rigor e experiência.",
  "Meet the team behind the work.": "Conheça a equipe por trás do trabalho.",
  "38 advisors. Three cities. One standard.": "38 consultores. Três cidades. Um padrão.",
  "View Our Team": "Ver Nossa Equipe",
  "What We Do": "O Que Fazemos",
  "Two practices.": "Duas práticas.",
  Limitless: "Escopo",
  scope: "ilimitado",
  "We work with professional clubs, sports federations, elite athletes, and event organizers to build the commercial, strategic, and operational infrastructure that winning requires.": "Trabalhamos com clubes profissionais, federações esportivas, atletas de elite e organizadores de eventos para construir a infraestrutura comercial, estratégica e operacional que vencer exige.",
  "Sports Management & Strategic Consulting": "Gestão Esportiva e Consultoria Estratégica",
  "Sports Events & Legal Advisory Services": "Eventos Esportivos e Assessoria Jurídica",
  "Branding, Media & Communication Services": "Branding, Mídia e Comunicação",
  "Performance Development & Athlete Welfare": "Desenvolvimento de Performance e Bem-Estar do Atleta",
  "Career Management, Intermediation & Scouting": "Gestão de Carreira, Intermediação e Scouting",
  "Franchise & Club Strategy": "Estratégia de Franquias e Clubes",
  "Athlete Career Management": "Gestão de Carreira de Atletas",
  "Sports Marketing & Sponsorship": "Marketing Esportivo e Patrocínio",
  "Performance Analytics": "Análise de Desempenho",
  "Venue & Event Optimization": "Otimização de Arenas e Eventos",
  "Sports Finance & Investment": "Finanças e Investimentos Esportivos",
  "End-to-end corporate advisory for organizations navigating growth, transformation, or transaction—delivered by partners who've sat across the table on both sides.": "Assessoria corporativa completa para organizações em crescimento, transformação ou transação, entregue por sócios que já estiveram dos dois lados da mesa.",
  "Corporate & Competitive Strategy": "Estratégia Corporativa e Competitiva",
  "M&A Advisory & Integration": "Assessoria e Integração em M&A",
  "Market Entry Planning": "Planejamento de Entrada em Mercado",
  "Operational Excellence": "Excelência Operacional",
  "Financial Restructuring": "Reestruturação Financeira",
  "Board & Governance Advisory": "Assessoria a Conselho e Governança",
  "Building the human and organizational infrastructure that allows elite performance to scale—talent, structure, leadership, and execution systems.": "Construímos a infraestrutura humana e organizacional que permite escalar alta performance: talentos, estrutura, liderança e sistemas de execução.",
  "Executive Talent Management": "Gestão de Talentos Executivos",
  "Organizational Design": "Desenho Organizacional",
  "Project & Program Management": "Gestão de Projetos e Programas",
  "Leadership Development": "Desenvolvimento de Liderança",
  "Change Management": "Gestão da Mudança",
  "Executive Coaching": "Coaching Executivo",
  "Winning on the pitch": "Vencendo em campo",
  and: "e",
  "in the boardroom.": "na sala do conselho.",
  "From Premier League clubs to Olympic national teams, we bring commercial rigour and sports expertise together for organizations that refuse to finish second.": "De clubes da Premier League a seleções olímpicas, unimos rigor comercial e expertise esportiva para organizações que se recusam a ficar em segundo lugar.",
  "Sports Practice by the numbers": "A prática esportiva em números",
  "Elite athletes managed": "Atletas de elite gerenciados",
  "Sports franchise clients": "Clientes de franquias esportivas",
  "Olympic teams advised": "Equipes olímpicas assessoradas",
  "Professional teams advised": "Equipes profissionais assessoradas",
  "Sports revenue advised": "Receita esportiva assessorada",
  "Our sports practice is led by Adetula Olabode—advisor who bring both lived experience in elite sport and analytical sophistication that separates strategy from guesswork.": "Nossa prática esportiva é liderada por Adetula Olabode, consultores que combinam vivência no esporte de elite com sofisticação analítica para separar estratégia de achismo.",
  "Our sports practice is led by Adetula Olabode—an advisor who brings lived experience in elite sport and the analytical sophistication that separates strategy from guesswork.": "Nossa prática esportiva é liderada por Adetula Olabode, um consultor que combina vivência no esporte de elite com a sofisticação analítica que separa estratégia de achismo.",
  "Discuss Your Sports Challenge": "Discuta Seu Desafio Esportivo",
  "Strategy that": "Estratégia que",
  survives: "sobrevive",
  "contact": "ao contato",
  "with reality.": "com a realidade.",
  "Corporate advisory for leaders who need to move—whether through growth, transformation, or transaction. We bring McKinsey-calibre thinking without the bureaucracy.": "Assessoria corporativa para líderes que precisam avançar, seja por crescimento, transformação ou transação. Entregamos pensamento no nível McKinsey sem a burocracia.",
  "Three-year strategic plans grounded in competitive analysis, market dynamics, and organizational capability—built to be executed, not shelved.": "Planos estratégicos de três anos baseados em análise competitiva, dinâmica de mercado e capacidade organizacional, feitos para serem executados, não arquivados.",
  "End-to-end transaction support from origination and due diligence through to post-close integration and value realization.": "Suporte completo a transações, da originação e due diligence à integração pós-fechamento e captura de valor.",
  "Whether entering a new geography, segment, or distribution channel, we map the path from insight to commercial traction.": "Ao entrar em uma nova geografia, segmento ou canal de distribuição, mapeamos o caminho do insight à tração comercial.",
  "Process design, cost optimization, and operating model transformation that delivers lasting efficiency without sacrificing growth.": "Desenho de processos, otimização de custos e transformação do modelo operacional para gerar eficiência duradoura sem sacrificar crescimento.",
  "Capital structure advisory, debt refinancing, and turnaround strategy for organizations navigating financial pressure or ownership transition.": "Assessoria em estrutura de capital, refinanciamento de dívida e estratégia de turnaround para organizações sob pressão financeira ou transição de controle.",
  "Board composition, governance frameworks, and executive accountability structures that protect stakeholders and accelerate decision-making.": "Composição de conselho, estruturas de governança e mecanismos de responsabilização executiva que protegem stakeholders e aceleram decisões.",
  "Serving FTSE 100, Fortune 500, and ambitious mid-market firms since 2008.": "Atendendo empresas FTSE 100, Fortune 500 e companhias médias ambiciosas desde 2008.",
  "Your challenge is our speciality.": "Seu desafio é a nossa especialidade.",
  "Talk to Us": "Fale Conosco",
  "Organizations built": "Organizações construídas",
  "to": "para",
  perform: "performar",
  "The difference between a great strategy and a failed one is often execution. We build the people, structure, and systems that close the gap.": "A diferença entre uma grande estratégia e uma estratégia fracassada muitas vezes está na execução. Construímos pessoas, estrutura e sistemas que fecham essa lacuna.",
  "Retained search, succession planning, and long-form talent strategy for C-suite and board-level roles across industries.": "Busca executiva, planejamento sucessório e estratégia de talentos de longo prazo para cargos de C-level e conselho em diversos setores.",
  "Operating model architecture, reporting line redesign, and structural transformation for organizations scaling or restructuring.": "Arquitetura de modelo operacional, redesenho de linhas de reporte e transformação estrutural para organizações em escala ou reestruturação.",
  "Governance frameworks, delivery assurance, and PMO infrastructure for complex, multi-workstream transformation programs.": "Estruturas de governança, garantia de entrega e infraestrutura de PMO para programas complexos de transformação com múltiplas frentes.",
  "360-degree leadership assessment, executive coaching, and structured development programs for high-potential leaders.": "Avaliação de liderança 360 graus, coaching executivo e programas estruturados de desenvolvimento para líderes de alto potencial.",
  "Stakeholder engagement, communication strategy, and behavioral change programs that ensure transformation lands—not just launches.": "Engajamento de stakeholders, estratégia de comunicação e programas de mudança comportamental que garantem que a transformação aconteça, não apenas seja lançada.",
  "1:1 coaching relationships for C-suite executives navigating leadership transitions, performance plateaus, or high-stakes decisions.": "Relações de coaching individual para executivos C-level em transições de liderança, platôs de performance ou decisões de alto risco.",
  "The work speaks": "O trabalho fala",
  "for": "por",
  itself: "si",
  All: "Todos",
  Sports: "Esportes",
  Business: "Negócios",
  Management: "Gestão",
  "Every engagement starts with a conversation.": "Todo projeto começa com uma conversa.",
  "Contact Us": "Fale Conosco",
  "Let's start a": "Vamos começar uma",
  conversation: "conversa",
  "Message received.": "Mensagem recebida.",
  "A member of our team will respond within one business day.": "Um membro da nossa equipe responderá em até um dia útil.",
  "We couldn't send your message. Please try again or email us directly.": "Não foi possível enviar sua mensagem. Tente novamente ou envie-nos um email diretamente.",
  "Send us a message": "Envie uma mensagem",
  "Full Name": "Nome completo",
  "Email Address": "Endereço de email",
  Organization: "Organização",
  Message: "Mensagem",
  "Send Message": "Enviar mensagem",
  "New York (HQ)": "Nova York (Sede)",
  Phone: "Telefone",
  Email: "Email",
  "Response Time": "Tempo de resposta",
  "Within 1 business day": "Em até 1 dia útil",
  "Frequently Asked Questions": "Perguntas Frequentes",
  "Everything you need": "Tudo o que você precisa",
  "to know": "saber",
  "to begin": "para começar",
  "Still have questions?": "Ainda tem perguntas?",
  "We're happy to walk you through the process.": "Teremos prazer em orientar você pelo processo.",
  "The people who": "As pessoas que",
  "do the work": "fazem o trabalho",
  "SIÃO SPORTS is a senior-led firm. Every partner named below leads engagements directly—they don't just supervise them. You get the person across the table, not a team of analysts behind them.": "A SIÃO SPORTS é uma firma liderada por sócios. Cada sócio listado abaixo conduz projetos diretamente; eles não apenas supervisionam. Você tem a pessoa à mesa, não uma equipe de analistas por trás.",
  "Join the SIÃO SPORTS team.": "Junte-se à equipe SIÃO SPORTS.",
  "View Open Positions": "Ver Vagas Abertas",
  "Partners & Clients": "Parceiros e Clientes",
  "Trusted by those": "Confiada por quem",
  who: "lidera",
  lead: "lideram",
  "their fields.": "seus setores.",
  "Strategic Partners": "Parceiros Estratégicos",
  "Organizations we work alongside.": "Organizações com as quais trabalhamos.",
  "Professional Clubs": "Clubes Profissionais",
  "Sports Academies": "Academias Esportivas",
  "Player Representatives": "Representantes de Jogadores",
  "Community Sport Programs": "Programas Esportivos Comunitários",
  "Client Portfolio": "Portfólio de Clientes",
  "Who we've worked with.": "Com quem já trabalhamos.",
  "Professional Sports": "Esportes Profissionais",
  Corporate: "Corporativo",
  "3× Premier League Clubs": "3 clubes da Premier League",
  "2× NFL Franchise Groups": "2 grupos de franquias da NFL",
  "4× Olympic National Federations": "4 federações olímpicas nacionais",
  "2× ATP Tour Players (Top 5)": "2 jogadores do ATP Tour (Top 5)",
  "8× FTSE 100 Companies": "8 empresas FTSE 100",
  "12× Fortune 500 Enterprises": "12 empresas Fortune 500",
  "6× Private Equity-Backed Firms": "6 empresas apoiadas por private equity",
  "4× Family Office Groups": "4 grupos de family office",
  "3× Sovereign Wealth Funds": "3 fundos soberanos",
  "14× CEO Successions Managed": "14 sucessões de CEO gerenciadas",
  "9× C-Suite Executive Placements": "9 colocações de executivos C-level",
  "22× Leadership Programs Delivered": "22 programas de liderança entregues",
  "6× Board Advisory Retainers": "6 contratos recorrentes de assessoria a conselhos",
  "Careers at SIÃO SPORTS": "Carreiras na SIÃO SPORTS",
  "Extraordinary work,": "Trabalho extraordinário,",
  extraordinary: "pessoas",
  people: "extraordinárias",
  "Senior-Led Culture": "Cultura Liderada por Sócios",
  "Every advisor at SIÃO SPORTS works alongside the partners—not below layers of bureaucracy. You'll have direct exposure to the most complex engagements from day one.": "Todo consultor da SIÃO SPORTS trabalha ao lado dos sócios, sem camadas de burocracia. Você terá exposição direta aos projetos mais complexos desde o primeiro dia.",
  "Global Footprint": "Presença Global",
  "With offices in New York, London, and Dubai and clients across three continents, your work will be genuinely international from the start.": "Com escritórios em Nova York, Londres e Dubai e clientes em três continentes, seu trabalho será genuinamente internacional desde o início.",
  "Real Responsibility": "Responsabilidade Real",
  "We don't have junior holding patterns. Analysts here take on scope that analysts at larger firms wait years to access.": "Não temos trilhas júnior de espera. Analistas aqui assumem escopos que, em firmas maiores, levariam anos para acessar.",
  "Open Positions": "Vagas Abertas",
  "Current opportunities.": "Oportunidades atuais.",
  Apply: "Candidatar-se",
  "Don't see a fit? Reach out anyway.": "Não encontrou uma vaga ideal? Entre em contato mesmo assim.",
  "We're always interested in exceptional people.": "Estamos sempre interessados em pessoas excepcionais.",
  "Send a Speculative Application": "Enviar uma candidatura espontânea",
  "Tell us about": "Conte-nos sobre",
  your: "seu",
  challenge: "desafio",
  "Thank you.": "Obrigado.",
  "A senior partner will personally review your submission and be in touch within one business day.": "Um sócio sênior revisará pessoalmente sua solicitação e entrará em contato em até um dia útil.",
  "We couldn't submit your request. Please try again or email us directly.": "Não foi possível enviar sua solicitação. Tente novamente ou envie-nos um email diretamente.",
  "Consultation Request": "Solicitação de Consultoria",
  "Service Area": "Área de Serviço",
  "Estimated Timeline": "Prazo Estimado",
  "Select one…": "Selecione uma opção...",
  "Multiple Practice Areas": "Múltiplas Áreas de Atuação",
  "Immediate (within 2 weeks)": "Imediato (em até 2 semanas)",
  "Near-term (1–3 months)": "Curto prazo (1-3 meses)",
  "Planning ahead (3–6 months)": "Planejamento futuro (3-6 meses)",
  Exploratory: "Exploratório",
  "Describe your challenge": "Descreva seu desafio",
  "Give us the context we need to respond meaningfully…": "Dê-nos o contexto necessário para responder de forma relevante...",
  "Submit Request": "Enviar solicitação",
  "Sending...": "Enviando...",
  "A senior partner personally reviews every submission. We respond within one business day.": "Um sócio sênior revisa pessoalmente cada solicitação. Respondemos em até um dia útil.",
  "What happens next?": "O que acontece agora?",
  "A senior partner reviews your submission personally—no auto-responses.": "Um sócio sênior revisa sua solicitação pessoalmente, sem respostas automáticas.",
  "We schedule a 45-minute discovery call within 1–2 business days.": "Agendamos uma chamada de descoberta de 45 minutos em 1-2 dias úteis.",
  "We conduct a structured assessment of your challenge.": "Conduzimos uma avaliação estruturada do seu desafio.",
  "We deliver a tailored proposal with scope, timeline, and commercial terms.": "Entregamos uma proposta personalizada com escopo, cronograma e condições comerciais.",
  "Prefer a direct conversation?": "Prefere uma conversa direta?",
  "Mon–Fri, 8am–7pm EST": "Seg-Sex, 8h-19h EST",
  Company: "Empresa",
  "About Us": "Sobre nós",
  FAQ: "FAQ",
  "Senior-led consulting for sports organizations, enterprises, and management teams. New York · London · Dubai.": "Consultoria liderada por sócios para organizações esportivas, empresas e equipes de gestão. Nova York · Londres · Dubai.",
  "© 2026 SIÃO SPORTS. All rights reserved.": "© 2026 SIÃO SPORTS. Todos os direitos reservados.",
  "Privacy Policy": "Política de Privacidade",
  "Terms of Use": "Termos de Uso",
  "Cookie Policy": "Política de Cookies",
  "Switch to Portuguese": "Mudar para português",
  "Switch to English": "Mudar para inglês",
  "Where Talent": "Onde o talento",
  "Global Opportunity": "oportunidade global",
  "One practice.": "Uma prática.",
  Focused: "Especialização",
  "expertise.": "focada.",
  "Read full bio": "Ler biografia completa",
  "Show less": "Mostrar menos",
  "Managing Director": "Diretor Executivo",
  "Adetula Olabode Harry is the Founder and Managing Director of Sião Sports Consulting and Management, bringing extensive experience in sports development, talent identification, athlete management, and international sports relations.": "Adetula Olabode Harry é o Fundador e Diretor Executivo da Sião Sports Consulting and Management, trazendo ampla experiência em desenvolvimento esportivo, identificação de talentos, gestão de atletas e relações esportivas internacionais.",
  "With a strong passion for youth empowerment through sports, he has dedicated his career to creating opportunities for talented athletes to achieve their full potential both locally and internationally. His expertise spans sports consulting, football scouting, player development, sports administration, event management, and strategic business development within the sports industry.": "Com uma forte paixão pelo empoderamento da juventude por meio do esporte, ele dedicou sua carreira à criação de oportunidades para que atletas talentosos alcancem todo o seu potencial, tanto local quanto internacionalmente. Sua expertise abrange consultoria esportiva, scouting de futebol, desenvolvimento de jogadores, administração esportiva, gestão de eventos e desenvolvimento estratégico de negócios dentro da indústria esportiva.",
  "As a visionary leader, Adetula Olabode Harry has established valuable partnerships with sports organizations, football clubs, academies, and stakeholders across Africa and Europe. His commitment to excellence has contributed to the successful development of numerous sports initiatives aimed at discovering, nurturing, and promoting young talents.": "Como líder visionário, Adetula Olabode Harry estabeleceu parcerias valiosas com organizações esportivas, clubes de futebol, academias e stakeholders em África e na Europa. Seu compromisso com a excelência contribuiu para o desenvolvimento bem-sucedido de inúmeras iniciativas esportivas voltadas à descoberta, formação e promoção de jovens talentos.",
  "Under his leadership, Sião Sports Consulting and Management has grown into a trusted organization providing comprehensive services in sports management, athlete representation, career development, branding, sports events, and performance enhancement. He is particularly passionate about creating pathways for African athletes to access international opportunities while promoting professionalism, integrity, and sustainable growth within the sports ecosystem.": "Sob sua liderança, a Sião Sports Consulting and Management cresceu e tornou-se uma organização de confiança, oferecendo serviços completos em gestão esportiva, representação de atletas, desenvolvimento de carreira, branding, eventos esportivos e aprimoramento de desempenho. Ele é especialmente apaixonado por criar caminhos para que atletas africanos acessem oportunidades internacionais, promovendo profissionalismo, integridade e crescimento sustentável no ecossistema esportivo.",
  "Through innovation, strategic thinking, and a results-driven approach, Adetula Olabode Harry continues to inspire positive change in the sports industry, helping athletes, organizations, and communities achieve their goals and unlock their full potential.": "Por meio da inovação, do pensamento estratégico e de uma abordagem orientada a resultados, Adetula Olabode Harry continua a inspirar mudanças positivas na indústria esportiva, ajudando atletas, organizações e comunidades a alcançar seus objetivos e desbloquear todo o seu potencial.",
  "His vision remains centered on building a globally recognized platform that connects talent with opportunity, develops future champions, and contributes to the advancement of sports as a tool for social and economic development.": "Sua visão permanece centrada na construção de uma plataforma reconhecida globalmente que conecta talento a oportunidades, desenvolve futuros campeões e contribui para o avanço do esporte como ferramenta de desenvolvimento social e econômico.",
  "We develop, represent, and position athletes for success on the international stage — turning potential into performance and ambition into achievement.": "Desenvolvemos, representamos e posicionamos atletas para o sucesso no cenário internacional, transformando potencial em desempenho e ambição em conquistas.",
  "Years of Proven Experience": "Anos de experiência comprovada",
  "Athletes & Sports Clients Served": "Atletas e clientes esportivos atendidos",
  "International Opportunities Delivered": "Oportunidades internacionais concretizadas",
  "Active Global Partnerships": "Parcerias globais ativas",
  "Ready to take your sports career to the next level?": "Pronto para levar sua carreira esportiva ao próximo nível?",
  "Established in 2025, Sião Sports Consulting and Management is a dynamic sports and business consultancy dedicated to empowering athletes, sports organizations, and communities through professional expertise, strategic innovation, and sustainable development.": "Fundada em 2025, a Sião Sports Consulting and Management é uma consultoria esportiva e empresarial dinâmica dedicada a capacitar atletas, organizações esportivas e comunidades por meio de expertise profissional, inovação estratégica e desenvolvimento sustentável.",
  "Operating at the intersection of sports, business, and talent development, we provide a comprehensive range of services designed to support athletes, clubs, academies, institutions, and corporate organizations in achieving their goals and maximizing their potential.": "Atuando na interseção entre esporte, negócios e desenvolvimento de talentos, oferecemos uma ampla gama de serviços para apoiar atletas, clubes, academias, instituições e organizações corporativas na conquista de seus objetivos e na maximização de seu potencial.",
  "Our expertise includes sports management consulting, strategic planning, project development, and the implementation of effective management processes. We work closely with stakeholders to develop and execute innovative sports development programs that deliver measurable impact and long-term success.": "Nossa expertise inclui consultoria em gestão esportiva, planejamento estratégico, desenvolvimento de projetos e implementação de processos de gestão eficazes. Trabalhamos em estreita colaboração com stakeholders para desenvolver e executar programas inovadores de desenvolvimento esportivo que geram impacto mensurável e sucesso duradouro.",
  "Sião Sports Consulting and Management specializes in career management, player representation, intermediation, and scouting services, creating pathways that connect talented athletes with professional opportunities at both national and international levels. Through our extensive network and industry knowledge, we identify promising talents, facilitate strategic partnerships, and support athletes throughout every stage of their careers.": "A Sião Sports Consulting and Management é especializada em gestão de carreira, representação de jogadores, intermediação e serviços de scouting, criando caminhos que conectam atletas talentosos a oportunidades profissionais em nível nacional e internacional. Por meio da nossa ampla rede e conhecimento do setor, identificamos talentos promissores, facilitamos parcerias estratégicas e apoiamos atletas em todas as etapas de suas carreiras.",
  "We are committed to discovering and developing the next generation of sporting talent through professional scouting programs, talent identification initiatives, and athlete development projects. Our mission is to bridge the gap between talent and opportunity while promoting excellence, professionalism, and integrity within the sports industry.": "Estamos comprometidos em descobrir e desenvolver a próxima geração de talentos esportivos por meio de programas profissionais de scouting, iniciativas de identificação de talentos e projetos de desenvolvimento de atletas. Nossa missão é aproximar talento e oportunidade, promovendo excelência, profissionalismo e integridade no setor esportivo.",
  "Our services also extend to the organization, promotion, and management of sporting and cultural events, as well as consulting in sports law and regulatory compliance. We assist sports organizations in navigating the evolving landscape of modern sports while ensuring adherence to professional and legal standards": "Nossos serviços também incluem organização, promoção e gestão de eventos esportivos e culturais, além de consultoria em direito esportivo e conformidade regulatória. Apoiamos organizações esportivas na navegação pelo cenário em evolução do esporte moderno, garantindo conformidade com padrões profissionais e legais.",
  "Our services also extend to the organization, promotion, and management of sporting and cultural events, as well as consulting in sports law and regulatory compliance. We assist sports organizations in navigating the evolving landscape of modern sports while ensuring adherence to professional and legal standards.": "Nossos serviços também incluem organização, promoção e gestão de eventos esportivos e culturais, além de consultoria em direito esportivo e conformidade regulatória. Apoiamos organizações esportivas na navegação pelo cenário em evolução do esporte moderno, garantindo conformidade com padrões profissionais e legais.",
  "In addition, we provide corporate branding and communication solutions, including logo design, brochure development, website creation, press relations, content development, media management, and social media management. These services help organizations and individuals establish strong, professional, and impactful brands.": "Além disso, oferecemos soluções de branding e comunicação corporativa, incluindo criação de logotipos, desenvolvimento de brochuras, criação de sites, relações com a imprensa, desenvolvimento de conteúdo, gestão de mídia e gestão de redes sociais. Esses serviços ajudam organizações e indivíduos a construir marcas fortes, profissionais e impactantes.",
  "To further support athletic excellence, we offer specialized training and performance development services focused on physical conditioning, injury prevention, rehabilitation support, health improvement, and performance enhancement. Our programs are carefully planned, implemented, and evaluated to help athletes achieve peak performance.": "Para apoiar ainda mais a excelência atlética, oferecemos serviços especializados de treinamento e desenvolvimento de desempenho focados em condicionamento físico, prevenção de lesões, suporte à reabilitação, melhoria da saúde e aprimoramento da performance. Nossos programas são cuidadosamente planejados, implementados e avaliados para ajudar atletas a atingir o máximo desempenho.",
  "At Sião Sports Consulting and Management, our vision is to become a globally recognized leader in sports consulting, talent development, scouting, intermediation, and career management. We are committed to creating opportunities, building lasting partnerships, and developing future champions who will make a positive impact both on and off the field.": "Na Sião Sports Consulting and Management, nossa visão é nos tornarmos uma referência global em consultoria esportiva, desenvolvimento de talentos, scouting, intermediação e gestão de carreira. Estamos comprometidos em criar oportunidades, construir parcerias duradouras e desenvolver futuros campeões que gerarão impacto positivo dentro e fora de campo.",
  "Empowering Talent. Creating Opportunities. Building Champions.": "Impulsionando talentos. Criando oportunidades. Formando campeões.",
  "Our mission is to empower athletes, sports organizations, and communities by providing innovative consulting, professional career management, talent identification, scouting, intermediation, and development solutions. We are committed to creating opportunities, fostering sustainable growth, promoting excellence, and connecting talent with pathways that enable success both on and off the field.": "Nossa missão é capacitar atletas, organizações esportivas e comunidades por meio de consultoria inovadora, gestão profissional de carreira, identificação de talentos, scouting, intermediação e soluções de desenvolvimento. Estamos comprometidos em criar oportunidades, promover crescimento sustentável, incentivar a excelência e conectar talentos a caminhos de sucesso dentro e fora de campo.",
  "Our vision is to become a globally recognized leader in sports consulting, talent development, scouting, intermediation, and career management, known for transforming potential into achievement and creating lasting impact within the global sports industry.": "Nossa visão é nos tornarmos uma referência global em consultoria esportiva, desenvolvimento de talentos, scouting, intermediação e gestão de carreira, reconhecida por transformar potencial em conquistas e gerar impacto duradouro na indústria esportiva global.",
  "Our mission is to empower athletes, sports organizations, and communities by providing innovative consulting, professional career management, talent identification, scouting, intermediation, and development solutions. We are committed to creating opportunities, fostering sustainable growth, promoting excellence, and connecting talent with pathways that enable success both on and off the field": "Nossa missão é capacitar atletas, organizações esportivas e comunidades por meio de consultoria inovadora, gestão profissional de carreira, identificação de talentos, scouting, intermediação e soluções de desenvolvimento. Estamos comprometidos em criar oportunidades, promover crescimento sustentável, incentivar a excelência e conectar talentos a caminhos de sucesso dentro e fora de campo.",
  "Our vision is to create a future where every talented athlete has access to the right opportunities, guidance, and platform to excel at the highest level. We aspire to be the leading consulting agency that shapes the global sports landscape, driving positive change, and leaving a lasting impact on the industry.": "Nossa visão é criar um futuro em que todo atleta talentoso tenha acesso às oportunidades, orientação e plataforma certas para se destacar no mais alto nível. Aspiramos ser a consultoria líder que molda o cenário esportivo global, impulsionando mudanças positivas e deixando um impacto duradouro na indústria.",
  Professionalism: "Profissionalismo",
  "We show up with professionalism, purpose, and a commitment to excellence. We bring clarity, strategy, and results to every client interaction, ensuring that athletes and organizations feel supported, confident, and empowered at every stage of their journey.": "Atuamos com profissionalismo, propósito e compromisso com a excelência. Levamos clareza, estratégia e resultados a cada interação com o cliente, garantindo que atletas e organizações se sintam apoiados, confiantes e fortalecidos em cada etapa da jornada.",
  Confidence: "Confiança",
  "We show up with confidence, passion, and a winning mindset. We are proactive, driven, and fearless in pursuing opportunities for our clients, always aiming to deliver impact and elevate performance on and off the field.": "Atuamos com confiança, paixão e mentalidade vencedora. Somos proativos, determinados e ousados na busca por oportunidades para nossos clientes, sempre com foco em gerar impacto e elevar o desempenho dentro e fora de campo.",
  "Client-Focused": "Foco no Cliente",
  "We show up as trusted partners—reliable, responsive, and committed to our clients’ success. We listen, understand, and provide tailored solutions that meet the unique needs of every athlete and organization we work with.": "Atuamos como parceiros confiáveis, responsáveis, ágeis e comprometidos com o sucesso dos nossos clientes. Ouvimos, entendemos e oferecemos soluções personalizadas para as necessidades únicas de cada atleta e organização com quem trabalhamos.",
  "Strong-Brand Identity": "Identidade de Marca Forte",
  "We show up with integrity, excellence, and purpose. We represent our clients with pride, act with transparency, and consistently deliver value that builds trust and long-term success.": "Atuamos com integridade, excelência e propósito. Representamos nossos clientes com orgulho, agimos com transparência e entregamos valor de forma consistente para construir confiança e sucesso duradouro.",
  "scope.": "ilimitado.",
  "Football stadium at night": "Estádio de futebol à noite",
  "We advise owners, boards, and executives on long-term club positioning, commercial infrastructure, governance, and financial sustainability.": "Assessoramos proprietários, conselhos e executivos no posicionamento de longo prazo dos clubes, infraestrutura comercial, governança e sustentabilidade financeira.",
  "Holistic career architecture for elite athletes—brand, sponsorship, financial planning, media, and post-competition transition.": "Estrutura completa de carreira para atletas de elite: marca, patrocínio, planejamento financeiro, mídia e transição pós-competição.",
  "From player recruitment analytics to in-season decision support, we build and deploy data systems that inform high-stakes sporting decisions.": "Da análise de recrutamento de jogadores ao suporte a decisões durante a temporada, construímos e implementamos sistemas de dados que orientam decisões esportivas de alto impacto.",
  "Sponsorship strategy, rights valuations, fan engagement programs, and digital audience development for clubs and federations.": "Estratégia de patrocínio, avaliação de direitos, programas de engajamento de torcedores e desenvolvimento de audiência digital para clubes e federações.",
  "Maximizing matchday revenue, stadium utilization, and event ROI through operational analysis and commercial restructuring.": "Maximizamos receita em dias de jogo, utilização de estádios e retorno de eventos por meio de análise operacional e reestruturação comercial.",
  "Ownership advisory, investment due diligence, and financing structure for acquisitions, stadium development, and media rights.": "Assessoria a proprietários, due diligence de investimentos e estruturação financeira para aquisições, desenvolvimento de estádios e direitos de mídia.",
  "FARO, PORTUGAL (HQ)": "FARO, PORTUGAL (Sede)",
  "Loule,Faro, Portugal": "Loulé, Faro, Portugal",
  "How does an engagement with SIÃO SPORTS typically begin?": "Como normalmente começa um projeto com a SIÃO SPORTS?",
  "We start with a no-obligation discovery call to understand your challenge. From there, we conduct a structured assessment and deliver a tailored proposal outlining scope, timeline, and commercial terms. Most engagements begin within 2–3 weeks of initial contact.": "Começamos com uma chamada inicial sem compromisso para entender o seu desafio. A partir daí, realizamos uma avaliação estruturada e entregamos uma proposta personalizada com escopo, cronograma e condições comerciais. A maioria dos projetos começa em 2 a 3 semanas após o primeiro contato.",
  "What is the typical duration of a consulting engagement?": "Qual é a duração típica de um projeto de consultoria?",
  "It depends on complexity and scope. Diagnostic projects run 4–8 weeks. Full strategy engagements typically span 3–6 months. Ongoing advisory retainers are available on a quarterly or annual basis.": "Depende da complexidade e do escopo. Projetos de diagnóstico duram de 4 a 8 semanas. Projetos completos de estratégia normalmente duram de 3 a 6 meses. Relações contínuas de assessoria estão disponíveis em bases trimestrais ou anuais.",
  "How do you price your services?": "Como vocês definem o preço dos serviços?",
  "We offer project-based fixed fees, daily rate engagements, and retained advisory relationships. All commercial terms are agreed before any engagement begins—no ambiguity, no surprises.": "Oferecemos valores fixos por projeto, contratos por diária e relações contínuas de assessoria. Todas as condições comerciais são acordadas antes do início de qualquer projeto, sem ambiguidades e sem surpresas.",
  "What industries do you specialize in?": "Em quais áreas vocês são especializados?",
  "Our practice area is Sports Consulting. We serve professional and elite sports organizations, athletes, and growth-focused teams.": "Nossa área de atuação é Consultoria Esportiva. Atendemos organizações esportivas profissionais e de elite, atletas e equipes focadas em crescimento.",
  "How large is your team?": "Qual é o tamanho da equipe?",
  "SIÃO SPORTS has 38 full-time advisors across our New York, London, and Dubai offices, plus a network of specialized independent partners we engage for specific projects.": "A SIÃO SPORTS conta com 38 consultores em tempo integral nos escritórios de Nova York, Londres e Dubai, além de uma rede de parceiros independentes especializados para projetos específicos.",
  "What distinguishes SIÃO SPORTS from larger consulting firms?": "O que diferencia a SIÃO SPORTS de consultorias maiores?",
  "Senior-led delivery. At SIÃO SPORTS, the partner who wins the engagement does the work. You will not be handed off to junior analysts. We combine strategic thinking with operational depth and move at the speed our clients require.": "Entrega liderada por profissionais seniores. Na SIÃO SPORTS, quem lidera a contratação também conduz o trabalho. Você não será transferido para analistas juniores. Combinamos pensamento estratégico com profundidade operacional e avançamos no ritmo que nossos clientes precisam.",
  "Do you offer ongoing advisory relationships?": "Vocês oferecem assessoria contínua?",
  "Yes. Many clients engage SIÃO SPORTS on a retained basis for ongoing board-level advisory, executive coaching, or market monitoring. These relationships are typically structured as quarterly or annual retainers.": "Sim. Muitos clientes contratam a SIÃO SPORTS em regime recorrente para assessoria contínua a conselhos, coaching executivo ou monitoramento de mercado. Essas relações normalmente são estruturadas como contratos trimestrais ou anuais.",
  "Can you work with early-stage organizations?": "Vocês trabalham com organizações em estágio inicial?",
  "Selectively. We take on early-stage clients where the strategic challenge is genuinely complex and the leadership team has the appetite to act decisively on what they hear. We are not the right fit for every stage.": "Seletivamente. Trabalhamos com clientes em estágio inicial quando o desafio estratégico é realmente complexo e a liderança está disposta a agir de forma decisiva a partir das recomendações. Não somos a opção ideal para todas as fases.",
  "Team collaboration": "Colaboração em equipe",
  "SIÃO SPORTS CEO": "CEO da SIÃO SPORTS",
  "City skyline": "Horizonte da cidade",
  "CEO & Founder": "CEO e Fundador",
  "Specializing in athlete development and international sports placements, with a growing track record of connecting emerging talent to global opportunities and professional networks.": "Especialista em desenvolvimento de atletas e colocações internacionais no esporte, com um histórico crescente de conexão entre talentos emergentes, oportunidades globais e redes profissionais.",
  "Athlete Management": "Gestão de Atletas",
  "International Placement": "Colocação Internacional",
  Portugal: "Portugal",
  "Senior-led consulting for sports organizations, enterprises, and management teams. Portugal.": "Consultoria liderada por sócios para organizações esportivas, empresas e equipes de gestão. Portugal.",
  "Loule, Faro, Portugal": "Loulé, Faro, Portugal",
  "FIFA Advisory Engagements": "Projetos de assessoria FIFA",
  "Full HR Overhauls for 4 organizations": "Reestruturações completas de RH para 4 organizações",
};

const PT_DYNAMIC_TERMS: Record<string, string> = {
  "CEO & Founding Partner": "CEO e Sócio Fundador",
  "Managing Director, Business Strategy": "Diretora Executiva, Estratégia Empresarial",
  "Head of Sports Consulting": "Líder de Consultoria Esportiva",
  "Senior Partner, M&A Advisory": "Sócio Sênior, Assessoria em M&A",
  "Head of Analytics": "Líder de Analytics",
  "Corporate Strategy": "Estratégia Corporativa",
  "M&A": "M&A",
  "Board Advisory": "Assessoria a Conselho",
  "Market Entry": "Entrada em Mercado",
  Operations: "Operações",
  "Financial Strategy": "Estratégia Financeira",
  "Franchise Strategy": "Estratégia de Franquias",
  "Sports Marketing": "Marketing Esportivo",
  "Talent Management": "Gestão de Talentos",
  "Org Design": "Desenho Organizacional",
  "Due Diligence": "Due Diligence",
  Integration: "Integração",
  "Data Strategy": "Estratégia de Dados",
  "BI Systems": "Sistemas de BI",
  London: "Londres",
  Dubai: "Dubai",
  "New York": "Nova York",
  "Full-time": "Tempo integral",
  Senior: "Sênior",
  "Mid-Level": "Pleno",
  "Entry Level": "Júnior",
  Analytics: "Analytics",
};

const PT_REVERSE_TRANSLATIONS = Object.fromEntries(
  Object.entries(PT_TRANSLATIONS).map(([english, portuguese]) => [portuguese, english])
);

const PT_REVERSE_DYNAMIC_TERMS = Object.fromEntries(
  Object.entries(PT_DYNAMIC_TERMS).map(([english, portuguese]) => [portuguese, english])
);

const TRANSLATABLE_ATTRS = ["alt", "placeholder", "aria-label", "title"];

function preserveWhitespace(original: string, translated: string) {
  const leading = original.match(/^\s*/)?.[0] ?? "";
  const trailing = original.match(/\s*$/)?.[0] ?? "";
  return `${leading}${translated}${trailing}`;
}

function translateCoreText(core: string, language: Lang) {
  const direct = language === "pt" ? PT_TRANSLATIONS[core] : PT_REVERSE_TRANSLATIONS[core];
  if (direct) return direct;

  const terms = language === "pt" ? PT_DYNAMIC_TERMS : PT_REVERSE_DYNAMIC_TERMS;
  const term = terms[core];
  if (term) return term;

  if (language === "pt") {
    if (core.endsWith(" read")) return `${translateText(core.replace(/ read$/, ""), language)} de leitura`;
    if (core.startsWith("Explore ")) return `Explorar ${translateText(core.replace(/^Explore /, ""), language)}`;
  } else {
    if (core.endsWith(" de leitura")) return `${translateText(core.replace(/ de leitura$/, ""), language)} read`;
    if (core.startsWith("Explorar ")) return `Explore ${translateText(core.replace(/^Explorar /, ""), language)}`;
  }

  if (core.includes(" · ")) {
    return core.split(" · ").map((part) => translateText(part, language)).join(" · ");
  }

  return core;
}

function translateText(text: string, language: Lang) {
  const core = text.trim();
  if (!core) return text;
  return preserveWhitespace(text, translateCoreText(core, language));
}

function translatePage(language: Lang) {
  const root = document.getElementById("root");
  if (!root) return;

  const translateElementAttrs = (element: Element) => {
    TRANSLATABLE_ATTRS.forEach((attr) => {
      const value = element.getAttribute(attr);
      if (value) element.setAttribute(attr, translateText(value, language));
    });
  };

  const walk = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE && node.textContent) {
      node.textContent = translateText(node.textContent, language);
      return;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return;

    const element = node as Element;
    if (element.closest("[data-no-translate]")) return;
    if (["SCRIPT", "STYLE", "NOSCRIPT"].includes(element.tagName)) return;

    translateElementAttrs(element);
    element.childNodes.forEach(walk);
  };

  walk(root);
}

const REVEAL_SELECTOR = [
  "main section",
  "main section h1",
  "main section h2",
  "main section h3",
  "main section > div > p",
  "main section .max-w-7xl > p",
  "main section img",
  "main section form",
  "main section button",
  "main section .grid > div",
  "main section li",
].join(", ");

function useSiteAnimations(page: Page) {
  useEffect(() => {
    const root = document.querySelector("main");
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const animatedElements = Array.from(root.querySelectorAll<HTMLElement>(REVEAL_SELECTOR))
      .filter((element) => !element.closest("[data-no-animate]"));

    animatedElements.forEach((element, index) => {
      element.classList.add("site-reveal");
      element.style.setProperty("--reveal-delay", `${Math.min(index % 8, 5) * 55}ms`);

      if (element.tagName === "IMG") {
        element.classList.add("site-reveal-image");
      }
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    animatedElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [page]);
}

function normalizePath(pathname: string) {
  const path = pathname.replace(/\/+$/, "") || "/";
  return path === "/sscm" ? "/" : path.replace(/^\/sscm(?=\/)/, "");
}

function getPageFromLocation() {
  if (typeof window === "undefined") return "home" as Page;
  return PATH_TO_PAGE[normalizePath(window.location.pathname)] || "home";
}

function setMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`;
  let element = document.head.querySelector<HTMLLinkElement>(selector);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    if (hreflang) element.setAttribute("hreflang", hreflang);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

function setJsonLd(page: Page, language: Lang, canonicalUrl: string) {
  const seo = SEO_CONTENT[page][language];
  let script = document.getElementById("site-json-ld") as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.id = "site-json-ld";
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }

  const organization = {
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#organization`,
    name: "SIÃO SPORTS",
    legalName: "Sião Sports Consulting and Management",
    url: SITE_URL,
    logo: DEFAULT_OG_IMAGE,
    image: DEFAULT_OG_IMAGE,
    email: "siaosportscm@gmail.com",
    telephone: "+351 916 507 934",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Estrada Vale de Eguas, 78, Bloco A Rc Dto",
      postalCode: "8135-033",
      addressLocality: "Almancil",
      addressRegion: "Faro",
      addressCountry: "PT",
    },
    areaServed: ["Portugal", "Europe", "Africa"],
    serviceType: [
      "Sports consulting",
      "Athlete management",
      "Talent scouting",
      "International player placement",
      "Sports branding",
      "Sports event management",
    ],
    sameAs: [
      "https://www.linkedin.com/company/si%C3%A3o-sports-consulting-and-management/",
      "https://x.com/siaosportscm?s=20",
      "https://www.instagram.com/siaosportscm",
      "https://web.facebook.com/profile.php?id=61583142392836",
    ],
  };

  const webPage = {
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: seo.title,
    description: seo.description,
    inLanguage: language === "pt" ? "pt-PT" : "en",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "SIÃO SPORTS",
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  };

  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [organization, webPage],
  });
}

function updateSeo(page: Page, language: Lang) {
  const seo = SEO_CONTENT[page][language];
  const canonicalUrl = `${SITE_URL}${PAGE_PATHS[page] === "/" ? "/" : PAGE_PATHS[page]}`;
  const locale = language === "pt" ? "pt_PT" : "en_US";

  document.title = seo.title;
  document.documentElement.lang = language === "pt" ? "pt-PT" : "en";
  setMeta("name", "description", seo.description);
  setMeta("name", "keywords", seo.keywords);
  setMeta("name", "robots", "index, follow, max-image-preview:large");
  setMeta("name", "author", "SIÃO SPORTS");
  setMeta("name", "application-name", "SIÃO SPORTS");
  setMeta("property", "og:type", "website");
  setMeta("property", "og:site_name", "SIÃO SPORTS");
  setMeta("property", "og:title", seo.title);
  setMeta("property", "og:description", seo.description);
  setMeta("property", "og:url", canonicalUrl);
  setMeta("property", "og:image", DEFAULT_OG_IMAGE);
  setMeta("property", "og:locale", locale);
  setMeta("name", "twitter:card", "summary_large_image");
  setMeta("name", "twitter:title", seo.title);
  setMeta("name", "twitter:description", seo.description);
  setMeta("name", "twitter:image", DEFAULT_OG_IMAGE);
  setLink("canonical", canonicalUrl);
  setLink("alternate", canonicalUrl, language === "pt" ? "pt-PT" : "en");
  setLink("alternate", canonicalUrl, "x-default");
  setJsonLd(page, language, canonicalUrl);
}

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────

const serif = { fontFamily: "'Playfair Display', Georgia, serif" };

function getImageSrc(photo: string, params: string) {
  return photo.startsWith("photo-")
    ? `https://images.unsplash.com/${photo}?${params}`
    : photo;
}

function SectionLabel({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <p className={`text-xs tracking-[0.25em] uppercase font-medium mb-4 ${light ? "text-[#B8872A]" : "text-[#B8872A]"}`}
      style={{ fontFamily: "'DM Mono', monospace" }}>
      {children}
    </p>
  );
}

function Btn({ children, onClick, variant = "gold", className = "" }:
  { children: React.ReactNode; onClick?: () => void; variant?: "gold" | "outline-light" | "outline-dark" | "dark"; className?: string }) {
  const styles = {
    gold: "bg-[#B8872A] text-white hover:bg-[#9E7324]",
    "outline-light": "border border-white/40 text-white hover:bg-white/10",
    "outline-dark": "border border-[#0C1527]/30 text-[#0C1527] hover:bg-[#0C1527] hover:text-white",
    dark: "bg-[#0C1527] text-white hover:bg-[#1a2d4a]",
  };
  return (
    <button onClick={onClick}
      className={`inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-200 ${styles[variant]} ${className}`}>
      {children}
    </button>
  );
}

function StatCard({ value, label, light = false }: { value: string; label: string; light?: boolean }) {
  return (
    <div className={`py-8 px-6 border-l ${light ? "border-white/20" : "border-[#0C1527]/15"}`}>
      <p style={serif} className={`text-4xl font-bold mb-1 ${light ? "text-white" : "text-[#0C1527]"}`}>{value}</p>
      <p className={`text-sm ${light ? "text-white/60" : "text-[#6B6050]"}`}>{label}</p>
    </div>
  );
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`relative block aspect-[3.6/1] overflow-hidden ${className}`}>
      <img
        src={siaoLogo}
        alt="SIÃO SPORTS"
        data-no-translate
        className="absolute left-1/2 top-1/2 block h-auto w-[122%] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain mix-blend-lighten"
      />
    </span>
  );
}

// ─── NAVIGATION ────────────────────────────────────────────────────────────────

function Nav({ current, language, navigate, onToggleLanguage }: {
  current: Page;
  language: Lang;
  navigate: (p: Page) => void;
  onToggleLanguage: () => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0C1527]/95 backdrop-blur-md border-b border-white/8">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16 lg:h-20">
        <button onClick={() => { navigate("home"); setMobileOpen(false); }} className="shrink-0 lg:mr-10">
          <Logo className="w-[165px] sm:w-[220px] lg:w-[205px] xl:w-[238px]" />
        </button>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-7">
          {NAV_LINKS.map((link) => (
            <button key={link.page} onClick={() => navigate(link.page)}
              className={`text-sm font-medium transition-colors ${current === link.page ? "text-[#B8872A]" : "text-white/75 hover:text-white"}`}>
              {link.label}
            </button>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2 xl:gap-3">
          <button
            type="button"
            onClick={onToggleLanguage}
            data-no-translate
            aria-label={language === "en" ? "Switch to Portuguese" : "Switch to English"}
            className="ml-2 border border-white/20 text-white/75 hover:text-white hover:border-[#B8872A] text-xs font-medium px-3 py-2.5 transition-colors flex items-center gap-2"
          >
            <Globe className="w-3.5 h-3.5 text-[#B8872A]" />
            {language === "en" ? "PT" : "EN"}
          </button>
          <button onClick={() => navigate("consultation")}
            className="bg-[#B8872A] text-white text-sm font-medium px-4 xl:px-6 py-2.5 hover:bg-[#9E7324] transition-colors">
            Request Consultation
          </button>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleLanguage}
            data-no-translate
            aria-label={language === "en" ? "Switch to Portuguese" : "Switch to English"}
            className="border border-white/20 text-white/80 hover:text-white hover:border-[#B8872A] text-xs font-medium px-2.5 py-2 transition-colors flex items-center gap-1.5"
          >
            <Globe className="w-3.5 h-3.5 text-[#B8872A]" />
            {language === "en" ? "PT" : "EN"}
          </button>
          <button className="text-white p-1" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-[#0C1527] border-t border-white/10 pb-6 px-6">
          <div className="pt-4 flex flex-col gap-0">
            {NAV_LINKS.map((link) => (
              <button key={link.page} onClick={() => { navigate(link.page); setMobileOpen(false); }}
                className="w-full text-left py-3.5 text-white/80 hover:text-white text-sm border-b border-white/8 transition-colors">
                {link.label}
              </button>
            ))}
            <button onClick={() => { navigate("consultation"); setMobileOpen(false); }}
              className="mt-5 w-full bg-[#B8872A] text-white py-3.5 text-sm font-medium hover:bg-[#9E7324] transition-colors">
              Request Consultation
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── FOOTER ────────────────────────────────────────────────────────────────────

function Footer({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <footer className="bg-[#080E1C] text-white/70">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-10 lg:pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="mb-5">
              <Logo className="w-[245px] max-w-full" />
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Senior-led consulting for sports organizations, enterprises, and management teams. Portugal.
            </p>
            <div className="flex gap-3">
              <a href="https://www.linkedin.com/company/si%C3%A3o-sports-consulting-and-management/" aria-label="LinkedIn" className="w-9 h-9 border border-white/15 flex items-center justify-center hover:border-[#B8872A] hover:text-[#B8872A] transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://x.com/siaosportscm?s=20" aria-label="X" className="w-9 h-9 border border-white/15 flex items-center justify-center hover:border-[#B8872A] hover:text-[#B8872A] transition-colors">
                <span className="text-sm font-semibold leading-none" aria-hidden="true">X</span>
              </a>
              <a href="https://www.instagram.com/siaosportscm?igsh=MTRocDRqZWl0MGZxeg%3D%3D" aria-label="Instagram" className="w-9 h-9 border border-white/15 flex items-center justify-center hover:border-[#B8872A] hover:text-[#B8872A] transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://web.facebook.com/profile.php?id=61583142392836&rdid=xApoyR4P5jRyi8d4&share_url=https%3A%2F%2Fweb.facebook.com%2Fshare%2F1HwBm5pb77%2F%3F_rdc%3D1%26_rdr" aria-label="Facebook" className="w-9 h-9 border border-white/15 flex items-center justify-center hover:border-[#B8872A] hover:text-[#B8872A] transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <p className="text-white text-xs tracking-[0.2em] uppercase font-medium mb-5"
              style={{ fontFamily: "'DM Mono', monospace" }}>Services</p>
            <ul className="space-y-3 text-sm">
              {[
                ["Our Services", "sports"],
                ["Request Consultation", "consultation"],
              ].map(([l, p]) => (
                <li key={p}>
                  <button onClick={() => navigate(p as Page)}
                    className="hover:text-white hover:translate-x-1 transition-all inline-block">
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white text-xs tracking-[0.2em] uppercase font-medium mb-5"
              style={{ fontFamily: "'DM Mono', monospace" }}>Company</p>
            <ul className="space-y-3 text-sm">
              {[
                ["About Us", "about"],
                ["Our Team", "team"],
                ["FAQ", "faq"],
              ].map(([l, p]) => (
                <li key={p}>
                  <button onClick={() => navigate(p as Page)}
                    className="hover:text-white hover:translate-x-1 transition-all inline-block">
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white text-xs tracking-[0.2em] uppercase font-medium mb-5"
              style={{ fontFamily: "'DM Mono', monospace" }}>Contact</p>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-[#B8872A] shrink-0 mt-0.5" />
                <span>Estrada Vale de Éguas, 78, Bloco A Rc Dto 8135-033 Almancil <br />Loule, Faro,  Portugal</span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-4 h-4 text-[#B8872A] shrink-0 mt-0.5" />
                <span>+351 916 507 934</span>
              </li>
              <li className="flex gap-3">
                <Mail className="w-4 h-4 text-[#B8872A] shrink-0 mt-0.5" />
                <span>siaosportscm@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between gap-4 text-xs text-white/35">
          <p>© 2026 SIÃO SPORTS. All rights reserved.</p>
          <div className="flex gap-6">
            <button onClick={() => navigate("privacy")} className="hover:text-white/60 transition-colors">Privacy Policy</button>
            <button onClick={() => navigate("terms")} className="hover:text-white/60 transition-colors">Terms of Use</button>
            <button onClick={() => navigate("cookies")} className="hover:text-white/60 transition-colors">Cookie Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── HOME PAGE ─────────────────────────────────────────────────────────────────

function HomePage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center bg-[#0C1527] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&h=1000&fit=crop&auto=format"
            alt="City skyline"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C1527] via-[#0C1527]/80 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-[#B8872A]" />
              <p className="text-[#B8872A] text-xs tracking-[0.25em] uppercase"
                style={{ fontFamily: "'DM Mono', monospace" }}>
                Strategy · Sports · Management
              </p>
            </div>
            <h1 style={serif} className="text-5xl lg:text-7xl font-bold text-white leading-[1.05] mb-8">
              Where Talent <br />
              <span className="italic text-[#B8872A]">Meets</span> Global Opportunity
            </h1>
            <p className="text-white/65 text-lg lg:text-xl leading-relaxed mb-10 max-w-xl">
              We develop, represent, and position athletes for success on the international stage — turning potential into performance and ambition into achievement.
            </p>
            <div className="flex flex-wrap gap-4">
              <Btn onClick={() => navigate("consultation")}>
                Request a Consultation <ArrowRight className="w-4 h-4" />
              </Btn>
              <Btn onClick={() => navigate("services")} variant="outline-light">
                Our Services
              </Btn>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 right-10 hidden lg:flex flex-col items-center gap-2">
          <div className="w-px h-16 bg-white/20" />
          <p className="text-white/30 text-[10px] tracking-[0.3em] mt-4"
            style={{ fontFamily: "'DM Mono', monospace", writingMode: "vertical-rl" }}>SCROLL</p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#F4EFE6] border-b border-[#0C1527]/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            <StatCard value="1+" label="Years of Proven Experience" />
            <StatCard value="20+" label="Athletes & Sports Clients Served" />
            <StatCard value="10+" label="International Opportunities Delivered" />
            <StatCard value="5" label="Active Global Partnerships" />
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 lg:py-32 bg-[#F4EFE6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            <div>
              <SectionLabel>Our Practice Areas</SectionLabel>
              <h2 style={serif} className="text-4xl lg:text-5xl font-bold text-[#0C1527] leading-tight">
                Three disciplines.<br />One standard of excellence.
              </h2>
            </div>
            <div className="flex items-end">
              <p className="text-[#6B6050] text-lg leading-relaxed">
                At SIAO Sport Consulting Agency, we offer a wide range of specialized services designed to support athletes, sports organizations, and brands in achieving excellence and sustainable growth.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-[#0C1527]/10">
            {[
              {
                icon: Trophy,
                title: "Athlete Representation & Management",
                desc: "We provide professional representation, contract negotiation, and career management services, ensuring athletes are well-positioned for success both on and off the field.",
                page: "sports" as Page,
                img: "photo-1574629810360-7efbbe195018",
              },
              {
                icon: Briefcase,
                title: "Talent Identification & Scouting",
                desc: "We identify and nurture promising talents, connecting them with the right opportunities, clubs, and platforms to advance their careers.",
                page: "sports" as Page,
                img: "photo-1560472355-536de3962603",
              },
              {
                icon: Users,
                title: "Career Development & Advisory",
                desc: "We guide athletes through every stage of their careers with personalized strategies, mentorship, and long-term planning.",
                page: "sports" as Page,
                img: "photo-1497366216548-37526070297c",
              },
            ].map(({ icon: Icon, title, desc, page, img }) => (
              <div key={title} className="bg-white group cursor-pointer" onClick={() => navigate(page)}>
                <div className="relative h-52 overflow-hidden bg-[#0C1527]">
                  <img
                    src={`https://images.unsplash.com/${img}?w=600&h=300&fit=crop&auto=format`}
                    alt={title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute bottom-4 left-6">
                    <div className="w-10 h-10 bg-[#B8872A] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-7">
                  <h3 style={serif} className="text-xl font-bold text-[#0C1527] mb-3 group-hover:text-[#B8872A] transition-colors">{title}</h3>
                  <p className="text-[#6B6050] text-sm leading-relaxed mb-5">{desc}</p>
                  <div className="flex items-center gap-2 text-[#B8872A] text-sm font-medium">
                    Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="bg-[#B8872A] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <h2 style={serif} className="text-3xl lg:text-4xl font-bold text-white mb-2">Ready to take your sports career to the next level?</h2>
            <p className="text-white/75">Start with a no-obligation discovery call.</p>
          </div>
          <div className="shrink-0">
            <button onClick={() => navigate("consultation")}
              className="bg-white text-[#B8872A] font-medium px-8 py-4 hover:bg-white/90 transition-colors text-sm">
              Request a Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────

function AboutPage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <div>
      <section className="pt-36 pb-20 bg-[#0C1527]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionLabel>About SIÃO SPORTS</SectionLabel>
          <h1 style={serif} className="text-5xl lg:text-6xl font-bold text-white max-w-3xl leading-tight">
            Built on conviction.<br />
            <span className="italic text-[#B8872A]">Measured</span> by results.
          </h1>
        </div>
      </section>

      <section className="py-24 bg-[#F4EFE6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel>Our Story</SectionLabel>
            <h2 style={serif} className="text-3xl lg:text-4xl font-bold text-[#0C1527] mb-6">Founded in 2025. Senior-led from day one.</h2>
            <p className="text-[#6B6050] leading-relaxed mb-5">
              Established in 2025, Sião Sports Consulting and Management is a dynamic sports and business consultancy dedicated to empowering athletes, sports organizations, and communities through professional expertise, strategic innovation, and sustainable development.

            </p>
            <p className="text-[#6B6050] leading-relaxed mb-5">
              Operating at the intersection of sports, business, and talent development, we provide a comprehensive range of services designed to support athletes, clubs, academies, institutions, and corporate organizations in achieving their goals and maximizing their potential.
            </p>
            <p className="text-[#6B6050] leading-relaxed mb-5">
              Our expertise includes sports management consulting, strategic planning, project development, and the implementation of effective management processes. We work closely with stakeholders to develop and execute innovative sports development programs that deliver measurable impact and long-term success.
            </p>
            <p className="text-[#6B6050] leading-relaxed mb-5">
              Sião Sports Consulting and Management specializes in career management, player representation, intermediation, and scouting services, creating pathways that connect talented athletes with professional opportunities at both national and international levels. Through our extensive network and industry knowledge, we identify promising talents, facilitate strategic partnerships, and support athletes throughout every stage of their careers.
              <br />
              We are committed to discovering and developing the next generation of sporting talent through professional scouting programs, talent identification initiatives, and athlete development projects. Our mission is to bridge the gap between talent and opportunity while promoting excellence, professionalism, and integrity within the sports industry.
              </p>
              <p className="text-[#6B6050] leading-relaxed mb-5">
               Our services also extend to the organization, promotion, and management of sporting and cultural events, as well as consulting in sports law and regulatory compliance. We assist sports organizations in navigating the evolving landscape of modern sports while ensuring adherence to professional and legal standards
              </p>
              <p className="text-[#6B6050] leading-relaxed mb-5">
                In addition, we provide corporate branding and communication solutions, including logo design, brochure development, website creation, press relations, content development, media management, and social media management. These services help organizations and individuals establish strong, professional, and impactful brands.
              </p>
              <p className="text-[#6B6050] leading-relaxed mb-5">
                To further support athletic excellence, we offer specialized training and performance development services focused on physical conditioning, injury prevention, rehabilitation support, health improvement, and performance enhancement. Our programs are carefully planned, implemented, and evaluated to help athletes achieve peak performance.
              </p>
              <p className="text-[#6B6050] leading-relaxed">
                At Sião Sports Consulting and Management, our vision is to become a globally recognized leader in sports consulting, talent development, scouting, intermediation, and career management. We are committed to creating opportunities, building lasting partnerships, and developing future champions who will make a positive impact both on and off the field.
              <br /><br />
              Empowering Talent. Creating Opportunities. Building Champions.
            </p>
          </div>
          <div className="relative">
            <img
              src={aboutGraphic}
              alt="SIÃO SPORTS consulting graphic"
              className="w-full h-auto max-h-[960px] object-contain bg-[#E8E2D8]"
            />
            <div className="absolute -bottom-6 -right-6 bg-[#B8872A] p-6 hidden lg:block">
              <p style={serif} className="text-white text-3xl font-bold">2025</p>
              <p className="text-white/70 text-xs mt-1">Year Founded</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-[#0C1527] py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-px bg-white/10">
          {[
            {
              icon: Target,
              label: "Our Mission",
              text: "Our mission is to empower athletes, sports organizations, and communities by providing innovative consulting, professional career management, talent identification, scouting, intermediation, and development solutions. We are committed to creating opportunities, fostering sustainable growth, promoting excellence, and connecting talent with pathways that enable success both on and off the field.",
            },
            {
              icon: Globe,
              label: "Our Vision",
              text: "Our vision is to become a globally recognized leader in sports consulting, talent development, scouting, intermediation, and career management, known for transforming potential into achievement and creating lasting impact within the global sports industry.",
            },
          ].map(({ icon: Icon, label, text }) => (
            <div key={label} className="bg-[#0C1527] p-12">
              <div className="w-12 h-12 border border-[#B8872A]/40 flex items-center justify-center mb-6">
                <Icon className="w-6 h-6 text-[#B8872A]" />
              </div>
              <p className="text-[#B8872A] text-xs tracking-[0.2em] uppercase mb-3"
                style={{ fontFamily: "'DM Mono', monospace" }}>{label}</p>
              <p style={serif} className="text-white text-2xl font-medium leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#F4EFE6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionLabel>Core Values</SectionLabel>
          <h2 style={serif} className="text-3xl lg:text-4xl font-bold text-[#0C1527] mb-14">How we show up, every engagement.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: "Professionalism", text: "We show up with professionalism, purpose, and a commitment to excellence. We bring clarity, strategy, and results to every client interaction, ensuring that athletes and organizations feel supported, confident, and empowered at every stage of their journey." },
              { icon: Zap, title: "Confidence", text: "We show up with confidence, passion, and a winning mindset. We are proactive, driven, and fearless in pursuing opportunities for our clients, always aiming to deliver impact and elevate performance on and off the field." },
              { icon: UserCheck, title: "Client-Focused", text: "We show up as trusted partners—reliable, responsive, and committed to our clients’ success. We listen, understand, and provide tailored solutions that meet the unique needs of every athlete and organization we work with." },
              { icon: BarChart2, title: "Strong-Brand Identity", text: "We show up with integrity, excellence, and purpose. We represent our clients with pride, act with transparency, and consistently deliver value that builds trust and long-term success." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="group">
                <div className="w-12 h-12 bg-[#0C1527] flex items-center justify-center mb-5 group-hover:bg-[#B8872A] transition-colors">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 style={serif} className="text-lg font-bold text-[#0C1527] mb-3">{title}</h3>
                <p className="text-[#6B6050] text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="py-16 bg-[#E8E2D8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <h2 style={serif} className="text-2xl lg:text-3xl font-bold text-[#0C1527] mb-2">Meet the team behind the work.</h2>
            {/* <p className="text-[#6B6050]">38 advisors. Three cities. One standard.</p> */}
          </div>
          <Btn onClick={() => navigate("team")} variant="dark">
            View Our Team <ArrowRight className="w-4 h-4" />
          </Btn>
        </div>
      </section>
    </div>
  );
}

// ─── SERVICES PAGE ─────────────────────────────────────────────────────────────

function ServicesPage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <div>
      <section className="pt-36 pb-20 bg-[#0C1527]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionLabel>What We Do</SectionLabel>
          <h1 style={serif} className="text-5xl lg:text-6xl font-bold text-white max-w-3xl leading-tight">
            One practice.<br />
            <span className="italic text-[#B8872A]">Focused</span> expertise.
          </h1>
        </div>
      </section>

      <section className="py-24 bg-[#F4EFE6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {[
            {
              title: "Our services",
              page: "sports" as Page,
              img: "photo-1574629810360-7efbbe195018",
              desc: "We work with professional clubs, sports federations, elite athletes, and event organizers to build the commercial, strategic, and operational infrastructure that winning requires.",
              services: ["Sports Management & Strategic Consulting", "Talent Identification & Athlete Development", "Sports Events & Legal Advisory Services", "Branding, Media & Communication Services", "Performance Development & Athlete Welfare", "Career Management, Intermediation & Scouting"],
            },
          ].map(({ title, page, img, desc, services }) => (
            <div key={title} className="grid lg:grid-cols-2 gap-16 items-center mb-24 last:mb-0 pb-24 last:pb-0 border-b border-[#0C1527]/10 last:border-0">
              <div>
                <h2 style={serif} className="text-3xl lg:text-4xl font-bold text-[#0C1527] mb-5">{title}</h2>
                <p className="text-[#6B6050] leading-relaxed mb-7">{desc}</p>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-3 mb-8">
                  {services.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm text-[#0C1527]">
                      <CheckCircle className="w-4 h-4 text-[#B8872A] shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
                <Btn onClick={() => navigate(page)} variant="dark">
                  Explore our services <ArrowRight className="w-4 h-4" />
                </Btn>
              </div>
              <div className="relative">
                <img
                  src={`https://images.unsplash.com/${img}?w=700&h=480&fit=crop&auto=format`}
                  alt={title}
                  className="w-full h-80 lg:h-96 object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── SPORTS PAGE ───────────────────────────────────────────────────────────────

function SportsPage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <div>
      <section className="relative pt-36 pb-24 bg-[#0C1527] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1652541090220-c9a0d15edbe4?w=1600&h=800&fit=crop&auto=format"
          alt="Football stadium at night"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <SectionLabel>Sports Consulting</SectionLabel>
          <h1 style={serif} className="text-5xl lg:text-6xl font-bold text-white max-w-2xl leading-tight mb-6">
            Winning on the pitch<br />
            <span className="italic text-[#B8872A]">and</span> in the boardroom.
          </h1>
          <p className="text-white/65 text-xl max-w-2xl leading-relaxed">
            From Premier League clubs to Olympic national teams, we bring commercial rigour and sports expertise together for organizations that refuse to finish second.
          </p>
        </div>
      </section>

      <section className="py-24 bg-[#F4EFE6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { icon: Trophy, title: "Sports Management & Strategic Consulting", desc: "Our expertise includes sports management consulting, strategic planning, project development, and the implementation of effective management processes. We work closely with stakeholders to develop and execute innovative sports development programs that deliver measurable impact and long-term success." },
              { icon: UserCheck, title: "Talent Identification & Athlete Development", desc: "We are committed to discovering and developing the next generation of sporting talent through professional scouting programs, talent identification initiatives, and athlete development projects. Our mission is to bridge the gap between talent and opportunity while promoting excellence, professionalism, and integrity within the sports industry." },
              { icon: BarChart2, title: "Sports Events & Legal Advisory Services", desc: "Our services also extend to the organization, promotion, and management of sporting and cultural events, as well as consulting in sports law and regulatory compliance. We assist sports organizations in navigating the evolving landscape of modern sports while ensuring adherence to professional and legal standards." },
              { icon: Globe, title: "Branding, Media & Communication Services", desc: "In addition, we provide corporate branding and communication solutions, including logo design, brochure development, website creation, press relations, content development, media management, and social media management. These services help organizations and individuals establish strong, professional, and impactful brands." },
              { icon: Building2, title: "Performance Development & Athlete Welfare", desc: "To further support athletic excellence, we offer specialized training and performance development services focused on physical conditioning, injury prevention, rehabilitation support, health improvement, and performance enhancement. Our programs are carefully planned, implemented, and evaluated to help athletes achieve peak performance." },
              { icon: Shield, title: "Career Management, Intermediation & Scouting", desc: "Sião Sports Consulting and Management specializes in career management, player representation, intermediation, and scouting services, creating pathways that connect talented athletes with professional opportunities at both national and international levels. Through our extensive network and industry knowledge, we identify promising talents, facilitate strategic partnerships, and support athletes throughout every stage of their careers." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white p-7 border border-[#0C1527]/8 hover:shadow-md transition-shadow group">
                <div className="w-11 h-11 bg-[#F4EFE6] flex items-center justify-center mb-5 group-hover:bg-[#B8872A] transition-colors">
                  <Icon className="w-5 h-5 text-[#0C1527] group-hover:text-white transition-colors" />
                </div>
                <h3 style={serif} className="text-lg font-bold text-[#0C1527] mb-3">{title}</h3>
                <p className="text-[#6B6050] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── CONTACT PAGE ──────────────────────────────────────────────────────────────

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", org: "", message: "" });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await submitToFormspree({
        formType: "Contact Us",
        _subject: "New website contact message",
        name: form.name,
        email: form.email,
        _replyto: form.email,
        organization: form.org,
        message: form.message,
      });
      setSent(true);
    } catch (err) {
      console.error(err);
      setError("We couldn't send your message. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <section className="pt-36 pb-20 bg-[#0C1527]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionLabel>Contact Us</SectionLabel>
          <h1 style={serif} className="text-5xl lg:text-6xl font-bold text-white max-w-3xl leading-tight">
            Let's start a<br />
            <span className="italic text-[#B8872A]">conversation</span>.
          </h1>
        </div>
      </section>

      <section className="py-24 bg-[#F4EFE6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-5 gap-16">
          <div className="lg:col-span-3">
            {sent ? (
              <div className="bg-white p-12 border border-[#0C1527]/8 text-center">
                <CheckCircle className="w-14 h-14 text-[#B8872A] mx-auto mb-6" />
                <h2 style={serif} className="text-2xl font-bold text-[#0C1527] mb-3">Message received.</h2>
                <p className="text-[#6B6050]">A member of our team will respond within one business day.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="bg-white p-10 border border-[#0C1527]/8 space-y-5">
                <h2 style={serif} className="text-2xl font-bold text-[#0C1527] mb-6">Send us a message</h2>
                {error && <p className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">{error}</p>}
                {[
                  { id: "name", label: "Full Name", type: "text" },
                  { id: "email", label: "Email Address", type: "email" },
                  { id: "org", label: "Organization", type: "text" },
                ].map(({ id, label, type }) => (
                  <div key={id}>
                    <label className="block text-xs tracking-[0.15em] uppercase font-medium text-[#0C1527] mb-2"
                      style={{ fontFamily: "'DM Mono', monospace" }}>{label}</label>
                    <input
                      type={type}
                      required
                      value={(form as any)[id]}
                      onChange={(e) => setForm({ ...form, [id]: e.target.value })}
                      className="w-full bg-[#F4EFE6] border border-[#0C1527]/15 px-4 py-3 text-sm text-[#0C1527] focus:outline-none focus:border-[#B8872A] transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs tracking-[0.15em] uppercase font-medium text-[#0C1527] mb-2"
                    style={{ fontFamily: "'DM Mono', monospace" }}>Message</label>
                  <textarea
                    required rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-[#F4EFE6] border border-[#0C1527]/15 px-4 py-3 text-sm text-[#0C1527] focus:outline-none focus:border-[#B8872A] transition-colors resize-none"
                  />
                </div>
                <button type="submit" disabled={submitting}
                  className="w-full bg-[#0C1527] text-white py-4 text-sm font-medium hover:bg-[#1a2d4a] transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                  {submitting ? "Sending..." : "Send Message"} <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          <div className="lg:col-span-2 space-y-8">
            {[
              { icon: MapPin, title: "FARO, PORTUGAL (HQ)", lines: ["Estrada Vale de Éguas, 78, Bloco A Rc Dto 8135-033 Almancil", "Loule,Faro, Portugal"] }
            ].map(({ icon: Icon, title, lines }) => (
              <div key={title} className="flex gap-4">
                <div className="w-10 h-10 bg-[#0C1527] flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-[#B8872A]" />
                </div>
                <div>
                  <p className="font-medium text-[#0C1527] text-sm mb-1">{title}</p>
                  {lines.map((l) => <p key={l} className="text-[#6B6050] text-sm">{l}</p>)}
                </div>
              </div>
            ))}
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-[#0C1527] flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-[#B8872A]" />
              </div>
              <div>
                <p className="font-medium text-[#0C1527] text-sm mb-1">Phone</p>
                <p className="text-[#6B6050] text-sm">+351 916 507 934</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-[#0C1527] flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-[#B8872A]" />
              </div>
              <div>
                <p className="font-medium text-[#0C1527] text-sm mb-1">Email</p>
                <p className="text-[#6B6050] text-sm">siaosportscm@gmail.com</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-[#0C1527] flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-[#B8872A]" />
              </div>
              <div>
                <p className="font-medium text-[#0C1527] text-sm mb-1">Response Time</p>
                <p className="text-[#6B6050] text-sm">Within 1 business day</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── FAQ PAGE ──────────────────────────────────────────────────────────────────

function FAQPage({ navigate }: { navigate: (p: Page) => void }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div>
      <section className="pt-36 pb-20 bg-[#0C1527]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionLabel>Frequently Asked Questions</SectionLabel>
          <h1 style={serif} className="text-5xl lg:text-6xl font-bold text-white max-w-3xl leading-tight">
            Everything you need<br />to know<span className="text-[#B8872A] italic"> to begin</span>.
          </h1>
        </div>
      </section>

      <section className="py-24 bg-[#F4EFE6]">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="divide-y divide-[#0C1527]/10">
            {FAQS.map((faq, i) => (
              <div key={i}>
                <button
                  className="w-full flex items-center justify-between py-6 text-left gap-6"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span style={serif} className="text-lg font-semibold text-[#0C1527]">{faq.q}</span>
                  <span className="shrink-0 w-8 h-8 border border-[#0C1527]/20 flex items-center justify-center text-[#0C1527]">
                    {open === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                {open === i && (
                  <p className="text-[#6B6050] leading-relaxed pb-6 pr-12">{faq.a}</p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-14 bg-[#0C1527] p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div>
              <p style={serif} className="text-white text-xl font-bold mb-1">Still have questions?</p>
              <p className="text-white/55 text-sm">We're happy to walk you through the process.</p>
            </div>
            <Btn onClick={() => navigate("contact")}>
              Contact Us <ArrowRight className="w-4 h-4" />
            </Btn>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── BLOG PAGE ─────────────────────────────────────────────────────────────────

function BlogPage() {
  const [filter, setFilter] = useState("All");
  const cats = ["All", "Sports", "Management"];
  const filtered = filter === "All" ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.category === filter);

  return (
    <div>
      <section className="pt-36 pb-20 bg-[#0C1527]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionLabel>Insights & Analysis</SectionLabel>
          <h1 style={serif} className="text-5xl lg:text-6xl font-bold text-white max-w-3xl leading-tight">
            Thinking from<br />
            the <span className="italic text-[#B8872A]">front lines</span>.
          </h1>
        </div>
      </section>

      <section className="py-24 bg-[#F4EFE6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Featured */}
          <div className="grid lg:grid-cols-2 gap-0 mb-14 bg-white border border-[#0C1527]/8">
            <div className="relative h-64 lg:h-auto bg-[#0C1527] overflow-hidden">
              <img
                src={`https://images.unsplash.com/${BLOG_POSTS[0].image}?w=700&h=500&fit=crop&auto=format`}
                alt={BLOG_POSTS[0].title}
                className="w-full h-full object-cover opacity-70"
              />
            </div>
            <div className="p-10 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[#B8872A] text-xs tracking-[0.2em] uppercase font-medium"
                  style={{ fontFamily: "'DM Mono', monospace" }}>{BLOG_POSTS[0].category}</span>
                <span className="text-[#0C1527]/20">·</span>
                <span className="text-[#6B6050] text-xs">{BLOG_POSTS[0].readTime} read</span>
              </div>
              <h2 style={serif} className="text-3xl font-bold text-[#0C1527] mb-4 leading-tight">{BLOG_POSTS[0].title}</h2>
              <p className="text-[#6B6050] leading-relaxed mb-6">{BLOG_POSTS[0].excerpt}</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#E5DFD3]" />
                <div>
                  <p className="text-[#0C1527] text-sm font-medium">{BLOG_POSTS[0].author}</p>
                  <p className="text-[#6B6050] text-xs">{BLOG_POSTS[0].date}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mb-10">
            {cats.map((c) => (
              <button key={c} onClick={() => setFilter(c)}
                className={`px-5 py-2.5 text-sm font-medium transition-colors ${filter === c ? "bg-[#0C1527] text-white" : "bg-white text-[#0C1527] border border-[#0C1527]/15 hover:bg-[#0C1527]/5"}`}>
                {c}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.slice(filter === "All" ? 1 : 0).map((post) => (
              <div key={post.id} className="bg-white border border-[#0C1527]/8 group cursor-pointer hover:shadow-md transition-shadow">
                <div className="relative h-48 overflow-hidden bg-[#0C1527]">
                  <img
                    src={`https://images.unsplash.com/${post.image}?w=500&h=280&fit=crop&auto=format`}
                    alt={post.title}
                    className="w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                  />
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[#B8872A] text-[10px] tracking-[0.2em] uppercase font-medium"
                      style={{ fontFamily: "'DM Mono', monospace" }}>{post.category}</span>
                    <span className="text-[#0C1527]/20">·</span>
                    <span className="text-[#6B6050] text-xs">{post.readTime} read</span>
                  </div>
                  <h3 style={serif} className="text-lg font-bold text-[#0C1527] mb-3 leading-snug">{post.title}</h3>
                  <p className="text-[#6B6050] text-sm leading-relaxed mb-5">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-[#0C1527]/8">
                    <p className="text-[#6B6050] text-xs">{post.author} · {post.date}</p>
                    <BookOpen className="w-4 h-4 text-[#B8872A] group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── TEAM PAGE ─────────────────────────────────────────────────────────────────

function TeamPage({ navigate }: { navigate: (p: Page) => void }) {
  const [expandedMember, setExpandedMember] = useState<string | null>(null);

  return (
    <div>
      <section className="pt-36 pb-20 bg-[#0C1527]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionLabel>Our Team</SectionLabel>
          <h1 style={serif} className="text-5xl lg:text-6xl font-bold text-white max-w-3xl leading-tight">
            The people who<br />
            <span className="italic text-[#B8872A]">do the work</span>.
          </h1>
        </div>
      </section>

      <section className="py-24 bg-[#F4EFE6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-[#6B6050] text-lg max-w-2xl mb-16 leading-relaxed">
            SIÃO SPORTS is a senior-led firm. Every partner named below leads engagements directly—they don't just supervise them. You get the person across the table, not a team of analysts behind them.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM.map((member) => {
              const isExpanded = expandedMember === member.name;
              const visibleBio = isExpanded ? member.bio : member.bio.slice(0, 1);

              return (
                <div key={member.name} className="bg-white border border-[#0C1527]/8 group hover:shadow-lg transition-shadow">
                  <div className="relative h-64 overflow-hidden bg-[#E5DFD3]">
                    <img
                      src={getImageSrc(member.photo, "w=500&h=400&fit=crop&auto=format")}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0C1527]/60 to-transparent" />
                    <div className="absolute bottom-4 left-5">
                      <span className="text-[#B8872A] text-[10px] tracking-[0.2em] uppercase"
                        style={{ fontFamily: "'DM Mono', monospace" }}>{member.location}</span>
                    </div>
                  </div>
                  <div className="p-7">
                    <h3 style={serif} className="text-xl font-bold text-[#0C1527] mb-1">{member.name}</h3>
                    <p className="text-[#B8872A] text-sm font-medium mb-4">{member.title}</p>
                    <div className="space-y-4 mb-5">
                      {visibleBio.map((paragraph) => (
                        <p key={paragraph} className="text-[#6B6050] text-sm leading-relaxed">{paragraph}</p>
                      ))}
                    </div>
                    {member.bio.length > 1 && (
                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        onClick={() => setExpandedMember(isExpanded ? null : member.name)}
                        className="inline-flex items-center gap-2 text-[#0C1527] text-sm font-semibold mb-5 hover:text-[#B8872A] transition-colors"
                      >
                        {isExpanded ? "Show less" : "Read full bio"}
                        <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                      </button>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((e) => (
                        <span key={e} className="bg-[#F4EFE6] text-[#0C1527] text-xs px-3 py-1.5">{e}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </div>
  );
}

// ─── PARTNERS PAGE ─────────────────────────────────────────────────────────────

function PartnersPage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <div>
      <section className="pt-36 pb-20 bg-[#0C1527]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionLabel>Partners & Clients</SectionLabel>
          <h1 style={serif} className="text-5xl lg:text-6xl font-bold text-white max-w-3xl leading-tight">
            Trusted by those<br />
            who <span className="italic text-[#B8872A]">lead</span> their fields.
          </h1>
        </div>
      </section>

      <section className="py-24 bg-[#F4EFE6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionLabel>Strategic Partners</SectionLabel>
          <h2 style={serif} className="text-3xl font-bold text-[#0C1527] mb-12">Organizations we work alongside.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#0C1527]/10 mb-20">
            {PARTNERS.map((p) => (
              <div key={p} className="bg-white p-8 flex items-center justify-center min-h-[100px] hover:bg-[#F4EFE6] transition-colors">
                <p style={serif} className="text-[#0C1527] font-semibold text-center text-sm leading-snug">{p}</p>
              </div>
            ))}
          </div>

          <SectionLabel>Client Portfolio</SectionLabel>
          <h2 style={serif} className="text-3xl font-bold text-[#0C1527] mb-10">Who we've worked with.</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { label: "Professional Sports", items: ["3× Premier League Clubs", "2× NFL Franchise Groups", "4× Olympic National Federations", "FIFA Advisory Engagements", "2× ATP Tour Players (Top 5)"] },
              { label: "Corporate", items: ["8× FTSE 100 Companies", "12× Fortune 500 Enterprises", "6× Private Equity-Backed Firms", "4× Family Office Groups", "3× Sovereign Wealth Funds"] },
              { label: "Management", items: ["14× CEO Successions Managed", "9× C-Suite Executive Placements", "22× Leadership Programs Delivered", "6× Board Advisory Retainers", "Full HR Overhauls for 4 organizations"] },
            ].map(({ label, items }) => (
              <div key={label} className="bg-white p-8 border border-[#0C1527]/8">
                <p style={serif} className="text-lg font-bold text-[#0C1527] mb-5">{label}</p>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-[#6B6050]">
                      <CheckCircle className="w-4 h-4 text-[#B8872A] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Btn onClick={() => navigate("consultation")} variant="dark">
              Request a Consultation <ArrowRight className="w-4 h-4" />
            </Btn>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── CONSULTATION PAGE ─────────────────────────────────────────────────────────

function ConsultationPage() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", org: "",
    service: "", budget: "", timeline: "", challenge: "",
  });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await submitToFormspree({
        formType: "Request a Consultation",
        _subject: "New website consultation request",
        name: form.name,
        email: form.email,
        _replyto: form.email,
        phone: form.phone,
        organization: form.org,
        serviceArea: form.service,
        estimatedTimeline: form.timeline,
        challenge: form.challenge,
      });
      setSent(true);
    } catch (err) {
      console.error(err);
      setError("We couldn't submit your request. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <section className="pt-36 pb-20 bg-[#0C1527]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionLabel>Request a Consultation</SectionLabel>
          <h1 style={serif} className="text-5xl lg:text-6xl font-bold text-white max-w-3xl leading-tight">
            Tell us about<br />
            your <span className="italic text-[#B8872A]">challenge</span>.
          </h1>
        </div>
      </section>

      <section className="py-24 bg-[#F4EFE6]">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 grid lg:grid-cols-5 gap-16">
          <div className="lg:col-span-3">
            {sent ? (
              <div className="bg-white p-14 border border-[#0C1527]/8 text-center">
                <CheckCircle className="w-14 h-14 text-[#B8872A] mx-auto mb-6" />
                <h2 style={serif} className="text-3xl font-bold text-[#0C1527] mb-4">Thank you.</h2>
                <p className="text-[#6B6050] text-lg leading-relaxed max-w-sm mx-auto">
                  A senior partner will personally review your submission and be in touch within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="bg-white p-10 border border-[#0C1527]/8 space-y-5">
                <h2 style={serif} className="text-2xl font-bold text-[#0C1527] mb-6">Consultation Request</h2>
                {error && <p className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">{error}</p>}
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    { id: "name", label: "Full Name", type: "text" },
                    { id: "email", label: "Email", type: "email" },
                    { id: "phone", label: "Phone", type: "tel" },
                    { id: "org", label: "Organization", type: "text" },
                  ].map(({ id, label, type }) => (
                    <div key={id}>
                      <label className="block text-xs tracking-[0.15em] uppercase font-medium text-[#0C1527] mb-2"
                        style={{ fontFamily: "'DM Mono', monospace" }}>{label}</label>
                      <input type={type} required value={(form as any)[id]}
                        onChange={(e) => setForm({ ...form, [id]: e.target.value })}
                        className="w-full bg-[#F4EFE6] border border-[#0C1527]/15 px-4 py-3 text-sm text-[#0C1527] focus:outline-none focus:border-[#B8872A] transition-colors" />
                    </div>
                  ))}
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase font-medium text-[#0C1527] mb-2"
                      style={{ fontFamily: "'DM Mono', monospace" }}>Service Area</label>
                    <select required value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full bg-[#F4EFE6] border border-[#0C1527]/15 px-4 py-3 text-sm text-[#0C1527] focus:outline-none focus:border-[#B8872A] transition-colors">
                      <option value="">Select one…</option>
                      <option>Sports Consulting</option>
                      <option>Multiple Practice Areas</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase font-medium text-[#0C1527] mb-2"
                      style={{ fontFamily: "'DM Mono', monospace" }}>Estimated Timeline</label>
                    <select value={form.timeline}
                      onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                      className="w-full bg-[#F4EFE6] border border-[#0C1527]/15 px-4 py-3 text-sm text-[#0C1527] focus:outline-none focus:border-[#B8872A] transition-colors">
                      <option value="">Select one…</option>
                      <option>Immediate (within 2 weeks)</option>
                      <option>Near-term (1–3 months)</option>
                      <option>Planning ahead (3–6 months)</option>
                      <option>Exploratory</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs tracking-[0.15em] uppercase font-medium text-[#0C1527] mb-2"
                    style={{ fontFamily: "'DM Mono', monospace" }}>Describe your challenge</label>
                  <textarea required rows={5} value={form.challenge}
                    onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                    placeholder="Give us the context we need to respond meaningfully…"
                    className="w-full bg-[#F4EFE6] border border-[#0C1527]/15 px-4 py-3 text-sm text-[#0C1527] focus:outline-none focus:border-[#B8872A] transition-colors resize-none placeholder:text-[#6B6050]/50" />
                </div>
                <button type="submit" disabled={submitting}
                  className="w-full bg-[#B8872A] text-white py-4 text-sm font-medium hover:bg-[#9E7324] transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                  {submitting ? "Sending..." : "Submit Request"} <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[#6B6050] text-xs text-center">
                  A senior partner personally reviews every submission. We respond within one business day.
                </p>
              </form>
            )}
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#0C1527] p-8">
              <h3 style={serif} className="text-white text-xl font-bold mb-4">What happens next?</h3>
              <div className="space-y-5">
                {[
                  { step: "01", text: "A senior partner reviews your submission personally—no auto-responses." },
                  { step: "02", text: "We schedule a 45-minute discovery call within 1–2 business days." },
                  { step: "03", text: "We conduct a structured assessment of your challenge." },
                  { step: "04", text: "We deliver a tailored proposal with scope, timeline, and commercial terms." },
                ].map(({ step, text }) => (
                  <div key={step} className="flex gap-4">
                    <span className="text-[#B8872A] text-xs font-medium shrink-0 pt-0.5"
                      style={{ fontFamily: "'DM Mono', monospace" }}>{step}</span>
                    <p className="text-white/70 text-sm leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#E8E2D8] p-8">
              <p style={serif} className="text-[#0C1527] text-lg font-bold mb-3">Prefer a direct conversation?</p>
              <div className="space-y-3 text-sm text-[#6B6050]">
                <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#B8872A]" /> +351 916 507 934</p>
                <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#B8872A]" /> siaosportscm@gmail.com</p>
                <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#B8872A]" /> Mon–Fri, 8am–7pm EST</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── LEGAL PAGES ───────────────────────────────────────────────────────────────

function LegalPage({ page, language }: { page: LegalPageKey; language: Lang }) {
  const content = language === "pt" ? LEGAL_PAGES_PT[page] : LEGAL_PAGES[page];

  return (
    <div data-no-translate>
      <section className="pt-36 pb-20 bg-[#0C1527]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionLabel>{content.label}</SectionLabel>
          <h1 style={serif} className="text-5xl lg:text-6xl font-bold text-white max-w-3xl leading-tight">
            {content.title}
          </h1>
          <p className="text-white/55 mt-5 text-sm">{content.updated}</p>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-[#F4EFE6]">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <p className="text-[#0C1527] text-lg leading-relaxed mb-12">
            {content.intro}
          </p>
          <div className="space-y-10">
            {content.sections.map((section) => (
              <section key={section.heading} className="border-t border-[#0C1527]/12 pt-8">
                <h2 style={serif} className="text-2xl font-bold text-[#0C1527] mb-4">{section.heading}</h2>
                <div className="space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-[#6B6050] leading-relaxed">{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── APP ────────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>(() => getPageFromLocation());
  const [language, setLanguage] = useState<Lang>("en");

  const navigate = (p: Page) => {
    setPage(p);
    if (typeof window === "undefined") return;
    const path = PAGE_PATHS[p];
    if (normalizePath(window.location.pathname) !== path) {
      window.history.pushState({ page: p }, "", path);
    }
  };
  const toggleLanguage = () => setLanguage((current) => current === "en" ? "pt" : "en");

  useSiteAnimations(page);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [page]);

  useEffect(() => {
    const handlePopState = () => setPage(getPageFromLocation());
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    updateSeo(page, language);
  }, [page, language]);

  useEffect(() => {
    translatePage(language);

    const root = document.getElementById("root");
    if (!root) return;

    const observer = new MutationObserver(() => {
      observer.disconnect();
      translatePage(language);
      observer.observe(root, { childList: true, subtree: true, characterData: true });
    });

    observer.observe(root, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [language, page]);

  const pages: Record<Page, React.ReactNode> = {
    home: <HomePage navigate={navigate} />,
    about: <AboutPage navigate={navigate} />,
    services: <ServicesPage navigate={navigate} />,
    sports: <SportsPage navigate={navigate} />,
    contact: <ContactPage />,
    faq: <FAQPage navigate={navigate} />,
    blog: <BlogPage />,
    team: <TeamPage navigate={navigate} />,
    partners: <PartnersPage navigate={navigate} />,
    consultation: <ConsultationPage />,
    privacy: <LegalPage page="privacy" language={language} />,
    terms: <LegalPage page="terms" language={language} />,
    cookies: <LegalPage page="cookies" language={language} />,
  };

  return (
    <div className="min-h-screen bg-[#F4EFE6] flex flex-col">
      <Nav current={page} language={language} navigate={navigate} onToggleLanguage={toggleLanguage} />
      <main key={page} className="flex-1 page-transition">
        {pages[page]}
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}
