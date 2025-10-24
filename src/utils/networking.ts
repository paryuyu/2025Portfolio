export interface NetworkingEvent {
  id: number
  title: string
  date: string
  location: string
  description: string
  highlights: string[]
}

export const networkingEvents: NetworkingEvent[] = [
  {
    id: 1,
    title: "Tech Startup Meetup Seoul",
    date: "2024년 3월",
    location: "서울 강남구 코워킹 스페이스",
    description: "스타트업 창업자 및 개발자들과의 네트워킹 행사. 다양한 분야의 전문가들과 교류하며 최신 트렌드와 기술에 대해 논의했습니다.",
    highlights: [
      "스타트업 창업자 30여명과 교류",
      "최신 프론트엔드 개발 트렌드 공유",
      "협업 기회 발굴"
    ]
  },
  {
    id: 2,
    title: "React Korea Community Meetup",
    date: "2024년 6월",
    location: "서울 역삼동 D2 스타트업 팩토리",
    description: "React 개발자 커뮤니티 모임에서 실무 경험을 공유하고, 다른 개발자들의 노하우를 배우는 시간을 가졌습니다.",
    highlights: [
      "React 최신 기능 및 베스트 프랙티스 학습",
      "성능 최적화 경험 공유",
      "오픈소스 프로젝트 협업 논의"
    ]
  },
  {
    id: 3,
    title: "Frontend Developer Conference",
    date: "2024년 9월",
    location: "서울 코엑스",
    description: "국내외 프론트엔드 개발자들이 모여 최신 기술 동향과 실무 경험을 공유하는 대규모 컨퍼런스에 참가했습니다.",
    highlights: [
      "100여명의 개발자와 네트워킹",
      "웹 성능 최적화 세션 참여",
      "AI와 프론트엔드 통합 트렌드 학습"
    ]
  }
]
