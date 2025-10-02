type project = {
  projectNo: number;
  projectName: string;
  usedStack: string[];
  description: string;
  mainRole: string;
  contribution: string[];
  thumnail:string;
  projectVideoResources: string;
  period: {
    start: Date | string;
    end: Date | string;
  };
};

//썸네일 이미지 넣기
export const usedSkills = {
  git: 'git',
  vite: 'vite',
  react: 'react',
  nextjs: 'nextjs',
  reactQuery: 'react-query',
  zustand: 'zustand',
  typeScript: 'typeScript',
  javaScript: 'javaScript',
  jQuery: 'jQuery',
  css3: 'css3',
  scss: 'scss',
  tailwindcss: 'tailwindcss',
  axios: 'axios',
  recoil: 'recoil',
  reactRouterDom: 'react-router-dom',
  styledComponents:"styled-components",
  pwa:"PWA",
  androidStudio:"android-studio",
  xml:"XML"
};

export const projectInformation = [
  {
    projectNo: 1,
    projectName: 'Alt Console V2',
    mainRole:"화면 설계 및 UI/UX 개발",
    usedStack: [
      usedSkills.nextjs,
      usedSkills.reactQuery,
      usedSkills.zustand,
      usedSkills.typeScript,
      usedSkills.tailwindcss,
      usedSkills.reactQuery,
      usedSkills.axios,
    ],
    description: '교통 관제 모니터링 플랫폼',
    contribution: [
      '프론트엔드 단독 담당으로 프로젝트 전체 아키텍처 설계 및 구현 주도',
      'Next.js 기반 SPA 전환 및 TypeScript 적용으로 확장성과 안정성 확보',
      'Zustand, React Query를 활용한 상태 관리 및 서버 데이터 캐싱 최적화',
      '시설물 관리, 외부 서비스 통합 등 어드민 시스템 구축',
      'Web Push 기반 알림 시스템 설계 및 구현',
      'ECharts 기반 대시보드 개발 및 데이터 가상화/무한 스크롤로 성능 개선',
      'PWA 적용으로 오프라인 접근성 및 설치형 앱 경험 제공',
      '아키텍처 설계부터 성능 최적화, UX 개선까지 전반적인 기술 리더십 발휘',
      '고객 요구에 따른 신규 기능 설계 및 개발을 지속적으로 수행하며 플랫폼 전반의 기능 확장',
    ],
    projectVideoResources: '/images/altconsole/altconsole.mp4',
    thumnail:"/images/thumnails/console.svg",
    period: {
      start: new Date("2024-02-01"),
      end: new Date("2025-09-30"),
    },
  },
   {
    projectNo: 2,
    projectName: 'Alt Console BETA',
    mainRole:"모바일 UI/UX 대응",
    usedStack: [
      usedSkills.nextjs,
      usedSkills.reactQuery,
      usedSkills.zustand,
      usedSkills.typeScript,
      usedSkills.tailwindcss,
      usedSkills.reactQuery,
      usedSkills.axios,
    ],
    description: '교통 관제 모니터링 플랫폼',
    thumnail:"/images/thumnails/console.svg",
    contribution: [
      "반응형 UI 개발 주도",
      "중단되었던 UI/UX 개발에 참여하여 재진행"
    ],
    projectVideoResources: '',
    period: {
      start: new Date("2024-02-01"),
      end: new Date("2025-09-30"),
    },
  },
  {
    projectNo: 3,
    projectName: 'Alt Gate',
    usedStack: [
      usedSkills.react,
      usedSkills.scss,
      usedSkills.recoil,
      usedSkills.reactRouterDom,
      usedSkills.axios,
    ],
    mainRole:"화면 설계 및 UI/UX 개발",
    description: '사내 모니터링 플랫폼',
    contribution: [
        "사내 전용 서비스의 UI를 단독으로 설계 및 개발 (로그인, 대시보드, 결재/휴가 신청, 일정 관리)",
        "반응형 웹 적용으로 다양한 디바이스 환경에서 안정적인 동작 구현"],
    projectVideoResources: '/images/altgate/altgate.mp4',
    thumnail:"/images/thumnails/altGate.svg",
    period: {
      start: new Date("2023-12-01"),
      end:  new Date( "2024-01-31"), 
    },
  },
  {
    projectNo: 4,
    projectName: 'E-AVP',
    usedStack: [
      usedSkills.react,
      usedSkills.pwa,
      usedSkills.recoil,
      usedSkills.reactRouterDom,
      usedSkills.axios,
    ],
    mainRole: "연구 과제 UI 컴포넌트 개발 및 지원",
    description: '연구 과제',
    contribution: [   
        "팀 프로젝트에 중간에 투입되어 PWA 환경 도입 아이디어를 제안 및 환경 설정 및 서비스 워커 구현 주도",
        "디자인 가이드라인을 정확하게 준수하며 반응형 환경에 최적화된 UI 컴포넌트 개발",
        "다양한 디바이스 및 해상도에 대응하는 웹 인터페이스 개발 경험 축적",
        "팀원들과 협력하며 기술적 지식을 공유하고 프로젝트 성공에 기여"],
    projectVideoResources: '',
    thumnail:"/images/thumnails/eavp.jpg",
    period: {
      start: new Date("2023-08-01"),
      end: new Date("2023-11-30"),
    },
  }, {
    projectNo: 5,
    projectName: '알트에이 홈페이지',
    usedStack: [
        usedSkills.jQuery,
        usedSkills.scss,
    ],
    mainRole: '회사 홈페이지 UI/UX 유지보수',
    description: '알트에이 홈페이지',
    contribution: [
        "저해상도 기준으로 작성된 CSS를 고해상도 환경에 맞게 최적화",
        "정기적인 콘텐츠 업데이트로 회사의 최신성 유지",
        "레거시 코드(jQuery 기반) 분석 및 개선",
        "안정적인 서비스 운영과 지속적 개선"
    ],
    projectVideoResources: '',
    thumnail: "/images/thumnails/alta.png",
    period: {
      start: new Date("2023-08-01"),
      end: new Date("2023-11-30"),
    },
  },{
    projectNo: 6,
    projectName: 'NTLight',
    usedStack: [
        usedSkills.androidStudio,
        usedSkills.xml,
    ],
    mainRole: '안드로이드 앱 퍼블리싱 담당',
    description: '가로등 및 분전함 제어 플랫폼',
    contribution: [
        "디자인 시안에 따라 XML 레이아웃 구현",
        "다양한 화면 사이즈 및 해상도 대응",
    ],
    thumnail:"/images/thumnails/ntlight.svg",
    period: {
      start: new Date("2023-08-01"),
      end: new Date("2023-11-30"),
    },
  },
] as project[];
