  import { forwardRef, useLayoutEffect, useState } from "react"
  import { gsap } from "gsap"
  import { Draggable } from "gsap/Draggable"
  import { careerData } from "../utils/career"
  import { usedSkills } from "../utils/projects"

  gsap.registerPlugin(Draggable)

  interface AboutMeWindowProps {
    size: "full" | 120
    onClose: () => void
    onToggleSize: () => void
    isMobile?: boolean
    zIndex?: number
  }

  const AboutMeWindow = forwardRef<HTMLDivElement, AboutMeWindowProps>(({ size, onClose, onToggleSize, isMobile, zIndex }, ref) => {
    const [isResizing, setIsResizing] = useState(false)

    const handleDownloadIntroPdf = () => {
      const html = `<!doctype html>
      <html lang="ko">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>자기소개서 - Yuyu</title>
          <style>
            * { box-sizing: border-box; }
            body { font-family: -apple-system, BlinkMacSystemFont, 'Noto Sans KR', 'Apple SD Gothic Neo', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #111827; margin: 0; }
            .container { max-width: 840px; margin: 32px auto; padding: 0 24px; }
            h1 { font-size: 24px; margin: 0 0 8px; }
            .meta { color: #6b7280; font-size: 12px; margin-bottom: 24px; }
            h2 { font-size: 18px; margin: 28px 0 12px; }
            p { line-height: 1.7; margin: 0 0 10px; white-space: pre-line; }
            ul { margin: 8px 0 0 20px; }
            li { margin: 6px 0; line-height: 1.6; }
            .header { display: flex; justify-content: space-between; align-items: flex-end; gap: 16px; border-bottom: 1px solid #e5e7eb; padding-bottom: 12px; margin-bottom: 16px; }
            .contact { font-size: 12px; color: #374151; text-align: right; }
            @media print { a { text-decoration: none; color: inherit; } }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div>
                <h1>자기소개서</h1>
                <div class="meta">Frontend Developer · Yuyu</div>
              </div>
              <div class="contact">
                Email: u_00y@naver.com<br />
                Phone: 010-9653-9311<br />
                GitHub: https://github.com/paryuyu
              </div>
            </div>

            <h2>자기소개</h2>
            <p>사용자 중심의 관점에서 문제를 해결하고, 혁신적인 기술과 안정적인 운영 능력을 겸비하여 서비스의 가치를 높이는 3년차 프론트엔드 개발자 입니다. 저는 Next.js, React Query, Zustand 등 최신 기술 스택을 활용하여 교통관제 플랫폼 고도화 프로젝트를 단독으로 수행하며 아키텍처 설계부터 성능 최적화, PWA 적용까지 서비스 전반의 기술적 리더십을 발휘했습니다. 이와 더불어, 기존 jQuery 기반의 레거시 홈페이지 유지보수 및 개선 경험을 통해 변화하는 환경 속에서도 안정적인 서비스를 제공하고, 문제 해결에 기여하는 능력을 입증했습니다. 단순한 화면 구현을 넘어, 데이터 관리 효율화와 UX/UI 개선을 통해 실제 비즈니스 성과를 창출하는 것에 집중해왔습니다. 특히 디자이너, 백엔드 개발자와의 원활한 소통을 통해 프로젝트 완성도를 극대화하는 데 강점이 있습니다. 항상 변화하는 기술 트렌드에 발맞춰 성장하며, 혁신적인 사용자 경험을 제공하는 웹 서비스를 만드는 데 기여하고 싶습니다.</p>

            <h2>기술적 역량</h2>
            <ul>
              <li><strong>React & Next.js 기반 개발</strong>: 최신 문법과 커스텀 Hook을 적극 활용해 코드의 재사용성과 유지보수성을 높입니다. Next.js 기반 SPA, SSR 경험 모두 보유하고 있으며, 상태 관리에 React Query, Zustand를 활용합니다. 다양한 상태 관리 라이브러리를 활용합니다.</li>
              <li><strong>UI/UX 최적화</strong>: 사용자 경험을 중시하며, 반응형 웹, 인터랙션 구현, 성능 개선 등을 통해 직관적이고 편리한 UI를 제공합니다.</li>
              <li><strong>디자인 시스템 구축</strong>: Tailwind CSS, Styled-components 등 다양한 CSS 프레임워크를 능숙하게 활용하여, 일관된 디자인 시스템과 재사용 가능한 UI 컴포넌트를 구성합니다.</li>
              <li><strong>서버 및 전역 상태 관리</strong>: React Query를 통한 서버 상태 관리, 커스텀 Hook 기반의 로직 분리 및 상태 관리 최적화에 익숙합니다.</li>
              <li><strong>레거시 시스템 관리 및 개선</strong>: jQuery 기반의 기존 시스템 유지보수 및 개선 경험을 통해 레거시 코드 분석 능력과 안정적인 서비스 운영 역량을 갖추었습니다. 저해상도 환경에 맞춰진 CSS를 고해상도에 최적화하는 등 변화하는 환경에 적극적으로 대응합니다.</li>
            </ul>

            <h2>강점</h2>
            <ul>
              <li><strong>협업 중심의 커뮤니케이션 역량</strong>: 프론트엔드 단독 담당자로 프로젝트를 수행하며 디자이너와 백엔드 개발자 사이의 원활한 소통을 이끌어왔습니다. 각 직군의 니즈를 이해하고, 데이터 흐름과 사용자 요구사항을 조율함으로써 프로젝트 완성도를 높였습니다.</li>
              <li><strong>사용자 중심의 문제 해결력</strong>: 기획서나 디자인 시안에 담기지 않은 사용자 경험을 고려하며, 실제 사용자 입장에서의 불편함을 선제적으로 개선해왔습니다. 이를 통해 서비스의 전체적인 품질 향상에 기여했습니다.</li>
              <li><strong>지속적인 기술 학습과 적용 능력</strong>: 빠르게 변화하는 프론트엔드 트렌드를 놓치지 않기 위해 꾸준히 학습하고 있으며, 학습한 기술을 실제 프로젝트에 효과적으로 녹여내는 데 집중합니다. 이를 통해 기술적 완성도와 실용성을 동시에 추구하고 있습니다.</li>
              <li><strong>안정적인 서비스 운영 및 시스템 개선 역량</strong>: jQuery 기반의 기존 홈페이지 유지보수 및 개선 경험을 통해 레거시 코드에 대한 높은 이해도를 바탕으로 안정적인 서비스를 유지하고, 변화하는 환경에 맞춰 최적화하는 문제 해결 능력을 갖추었습니다.</li>
            </ul>

            <h2>성장 목표</h2>
            <p>저는 안정적인 서비스 운영과 최적의 사용자 경험을 핵심 가치로 삼는 프론트엔드 개발자로서 지속적인 성장을 추구합니다. 이를 위해 방송통신대 컴퓨터과학과를 통한 탄탄한 이론 학습과 실무 경험을 병행하며 컴퓨터 과학 전반에 대한 깊은 이해를 꾸준히 넓혀가고 있습니다.</p>
            <p>최근에는 견고하고 유지보수성 높은 코드 작성에 집중하며, 프론트엔드 아키텍처 설계 역량 강화를 목표로 컴포넌트 구조화, 효율적인 상태 관리 전략, 성능 최적화 패턴 등을 체계적으로 연구하고 프로젝트에 적용하고 있습니다. 단순한 기능 구현을 넘어, 사용자의 관점에서 불편함을 해소하고 서비스 만족도를 높이는 UI/UX 최적화에도 끊임없이 힘쓰고 있습니다.</p>
            <p>이러한 기술적 깊이와 문제 해결 능력을 바탕으로, 개발자 커뮤니티 참여 및 활발한 네트워킹을 통해 팀워크와 커뮤니케이션에서도 균형 잡힌 성장을 지향하며, 함께 가치를 만들어가는 데 기여하는 개발자가 되겠습니다.</p>
          </div>
          <script>
            window.onload = function(){
              window.print();
              setTimeout(() => window.close(), 300);
            }
          </script>
        </body>
      </html>`

      const printWindow = window.open('', '_blank')
      if (printWindow) {
        printWindow.document.open()
        printWindow.document.write(html)
        printWindow.document.close()
      }
    }

    const education = [
      {
        school: "한국방송통신대학교(4년제)",
        degree: "컴퓨터과학과",
        period: "2023.03 ~ 2025.02",
        description: "편입/졸업 · 지역: 서울 · 주/야간: 주간"
      },
      {
        school: "한국농수산대학(2·3년제)",
        degree: "화훼학과 조경전공",
        period: "2012.03 ~ 2015.02",
        description: "졸업 · 지역: 경기 · 주/야간: 주간 · 논문/작품: 창업논문"
      },
      {
        school: "순창제일고등학교",
        degree: "문과계열",
        period: "2009.03 ~ 2012.02",
        description: "졸업"
      }
    ]

    const educationActivities = [
      {
        organization: "한국경영원 인재개발원",
        course: "MERN Full Stack 개발자 양성 과정",
        period: "2022.06 ~ 2022.12",
        description: "교육 이수"
      }
    ]

    const skills = [
      { category: "Main Skills", items: Object.values(usedSkills) }
    ]

    // 드래그 및 리사이즈 기능 초기화
    useLayoutEffect(() => {
      if (ref && typeof ref === 'object' && ref.current && size !== "full") {
        const element = ref.current
        const dragHandle = element.querySelector('.drag-handle')
        
        // Window dragging
        const dragInstance = Draggable.create(element, {
          type: "x,y",
          bounds: window,
          allowContextMenu: true,
          trigger: dragHandle,
        })[0]

        // Resize functionality - 우측 하단 핸들만 사용
        const resizeHandle = element.querySelector('.resize-handle') as HTMLElement
        
        if (resizeHandle) {
          let startWidth = 0
          let startHeight = 0
          let startX = 0
          let startY = 0

          const handleMouseDown = (e: MouseEvent) => {
            e.preventDefault()
            e.stopPropagation()
            setIsResizing(true)
            
            const rect = element.getBoundingClientRect()
            startWidth = rect.width
            startHeight = rect.height
            startX = e.clientX
            startY = e.clientY
            
            document.body.style.cursor = 'nwse-resize'
            
            const handleMouseMove = (e: MouseEvent) => {
              const deltaX = e.clientX - startX
              const deltaY = e.clientY - startY
              
              const newWidth = Math.max(400, Math.min(window.innerWidth - 100, startWidth + deltaX))
              const newHeight = Math.max(300, Math.min(window.innerHeight - 100, startHeight + deltaY))
              
              element.style.width = `${newWidth}px`
              element.style.height = `${newHeight}px`
            }
            
            const handleMouseUp = () => {
              setIsResizing(false)
              document.body.style.cursor = ''
              document.removeEventListener('mousemove', handleMouseMove)
              document.removeEventListener('mouseup', handleMouseUp)
            }
            
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
          }

          resizeHandle.addEventListener('mousedown', handleMouseDown)

          return () => {
            dragInstance.kill()
            resizeHandle.removeEventListener('mousedown', handleMouseDown)
          }
        }

        return () => {
          dragInstance.kill()
        }
      }
    }, [ref, size, isResizing])

    // 전체화면/일반 크기 전환 애니메이션
    useLayoutEffect(() => {
      if (ref && typeof ref === 'object' && ref.current) {
        if (size === "full") {
          gsap.to(ref.current, {
            duration: 0.3,
            left: 0,
            top: 0,
            x: 0,
            y: '40px',
            padding: 0,
            width: "100vw",
            height: `calc(100dvh)`,
            ease: "power2.out"
          })
        } else {
          gsap.to(ref.current, {
            duration: 0.3,
            left: "16px",
            top: "16px",
            x: 0,
            y: 0,
            padding: "24px",
            width: "700px",
            height: "600px",
            ease: "power2.out"
          })
        }
      }
    }, [ref, size])

    return (
      <div
        ref={ref}
        className="absolute z-4"
        style={{
          padding: size === "full" ? "0" : "24px",
          width: size === "full" ? "100vw" : "700px",
          height: size === "full" ? `calc(100vh - ${isMobile ? 82 : 40}px)` : "600px",
          top: size === "full" ? "0" : "16px",
          left: size === "full" ? "0" : "16px",
          transform: "none",
          zIndex: zIndex
        }}
      >
        {/* 맥 스타일 윈도우 바 */}
        <div className="drag-handle flex items-center gap-2 bg-gray-100 p-3 rounded-t-lg border-b border-b-gray-200 cursor-grab active:cursor-grabbing">
          <div className="flex items-center gap-2 text-xs">
            <div
              className="bg-red-500 w-3 h-3 rounded-full cursor-pointer hover:bg-red-600 transition-colors"
              onClick={onClose}
              title="닫기"
            ></div>
            <div className="bg-gray-300 w-3 h-3 rounded-full cursor-pointer hover:bg-gray-400 transition-colors" title="최소화"></div>
            <div
              className={`${isMobile ? 'bg-gray-300' : 'bg-green-500'} w-3 h-3 rounded-full cursor-pointer hover:bg-green-600 transition-colors`}
              onClick={isMobile ? undefined : onToggleSize}
              title="크기 조절"
              aria-label="창 크기 조절"
            ></div>
          </div>
          <span className="text-black font-light text-sm">About Me</span>
        </div>

        {/* 컨텐츠 영역 */}
        <div className={`bg-white p-6 rounded-b-lg shadow-2xl overflow-y-auto ${size === "full" && isMobile ? 'pb-[66px]' : ''}`} style={{ height: "calc(100% - 44px)" }}>
          {/* 프로필 섹션 */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Profile</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 mb-2"><strong>Name:</strong> Yuyu</p>
              <p className="text-gray-700 mb-2"><strong>Role:</strong> Frontend Developer</p>
              <p className="text-gray-700 mb-2"><strong>Location:</strong> Seoul, South Korea</p>
              <p className="text-gray-700 mb-2"><strong>Email:</strong> u_00y@naver.com</p>
              <p className="text-gray-700"><strong>Phone:</strong> 010-9653-9311</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href="https://github.com/paryuyu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-200 text-sm text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                  title="GitHub"
                >
                  <svg viewBox="0 0 16 16" width="18" height="18" aria-hidden="true" fill="currentColor" className="text-gray-700">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.01.08-2.11 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.91.08 2.11.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                  <span>GitHub</span>
                  <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" aria-hidden="true" className="text-gray-500">
                    <path d="M14.5 3H8a1 1 0 100 2h3.586L6.293 10.293a1 1 0 101.414 1.414L13 6.414V10a1 1 0 102 0V3.5a.5.5 0 00-.5-.5z"/>
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/>
                  </svg>
                </a>
                <button
                  type="button"
                  onClick={handleDownloadIntroPdf}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-200 text-sm text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                  title="자기소개서 PDF 다운로드"
                >
                  <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" aria-hidden="true" className="text-gray-700">
                    <path d="M10 3a1 1 0 011 1v7.586l2.293-2.293a1 1 0 111.414 1.414l-4.007 4.007a1 1 0 01-1.414 0L5.279 10.707a1 1 0 111.414-1.414L9 11.586V4a1 1 0 011-1z"/>
                    <path d="M4 13a2 2 0 012-2h1a1 1 0 110 2H6v3h8v-3h-1a1 1 0 110-2h1a2 2 0 012 2v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3z"/>
                  </svg>
                  <span>자기소개서 PDF</span>
                </button>
              </div>
            </div>
          </div>
  {/* 스킬 섹션 */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((skillGroup, index) => (
                <div key={index} className={`bg-gray-50 p-4 rounded-lg ${skills.length === 1 ? 'md:col-span-2' : ''}`}>
                  <h3 className="font-semibold text-gray-800 mb-2">{skillGroup.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((item, idx) => (
                      <span
                        key={idx}
                        className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border border-gray-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* 커리어 섹션 */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Career</h2>
            <div className="space-y-4">
              {careerData.map((career, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                  <h3 className="text-lg font-semibold text-gray-800">{career.company}</h3>
                  <p className="text-sm text-gray-600">{career.position}</p>
                  <p className="text-xs text-gray-500 mb-2">{career.period}</p>
                  <p className="text-sm text-gray-700">{career.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 교육 섹션 */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Education</h2>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="border-l-4 border-green-500 pl-4 py-3">
                  <h3 className="text-lg font-semibold text-gray-800">{edu.school}</h3>
                  <p className="text-sm text-gray-600 mb-1">{edu.degree}</p>
                  <p className="text-xs text-gray-500 mb-2">{edu.period}</p>
                  {/* GPA removed per request */}
                  <p className="text-sm text-gray-700">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 교육 활동 섹션 */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Education Activities</h2>
            <div className="space-y-4">
              {educationActivities.map((act, index) => (
                <div key={index} className="border-l-4 border-purple-500 pl-4 py-3">
                  <h3 className="text-lg font-semibold text-gray-800">{act.organization}</h3>
                  <p className="text-sm text-gray-600 mb-1">{act.course}</p>
                  <p className="text-xs text-gray-500 mb-2">{act.period}</p>
                  {act.description && (
                    <p className="text-sm text-gray-700">{act.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

        
        </div>

        {/* 리사이즈 핸들 */}
        {size !== "full" && (
          <div
            className="resize-handle absolute w-8 h-8 cursor-se-resize flex items-center justify-center bg-gray-200/10 rounded-sm"
            style={{ 
              bottom: "30px",
              right: "24px",
              zIndex: 100
            }}
          >
          </div>
        )}
      </div>
    )
  })

  AboutMeWindow.displayName = 'AboutMeWindow'

  export default AboutMeWindow
