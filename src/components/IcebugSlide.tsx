// src/components/IcebugSlide.tsx — v2 (realistic iceberg + readable labels)
import { useEffect, useRef } from 'react';

type Chip = { label: string; x: number; y: number; tone?: 'up'|'down' };

const ABOVE: Chip[] = [
  { label: 'UI 핫픽스', x: 30, y: 23, tone:'up' },
  { label: '버그/요청 티켓', x: 50, y: 31, tone:'up' },
  { label: '일회성 대응', x: 72, y: 24, tone:'up' },
];

const BELOW: Chip[] = [
  { label: '문서/PR 템플릿 부재', x: 16, y: 61 },
  { label: '강제 새로고침 의존', x: 30, y: 56 },
  { label: '라우팅 규칙 불일치', x: 42, y: 53 },
  { label: '전역상태 남용', x: 56, y: 51 },
  { label: '키 관리/롤오버 부재', x: 70, y: 55 },
  { label: '인터셉터/에러코드북 없음', x: 79, y: 59 },
  { label: 'SDK 초기 로드 혼재', x: 88, y: 69 },
];

export default function IcebugSlide(){
  const stageRef = useRef<HTMLDivElement>(null);

  // 마우스 파라랙스(살짝 기울기)
  useEffect(() => {
    const el = stageRef.current!;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const mx = (e.clientX - r.left) / r.width - 0.5;
      const my = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty('--tiltX', `${my * 3}deg`);
      el.style.setProperty('--tiltY', `${mx * 5}deg`);
    };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--tiltX', `0deg`);
      el.style.setProperty('--tiltY', `0deg`);
    });
    return () => el.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <div className="icebug">
      {/* <div className="icebug-head">발표 이유 (Icebug)</div> */}

      <div className="icebug-stage" ref={stageRef} role="img" aria-label="수면 위/아래 빙산 다이어그램">
        {/* 하늘 안개(수면 위 가독성 향상용) */}
        <div className="sky-slab" aria-hidden />

        {/* 수면선 + 굴절 하이라이트 */}
        <div className="waterline" aria-hidden />
        <div className="water-shimmer" aria-hidden />

        {/* 파도 */}
        <svg className="waves back" viewBox="0 0 1200 140" preserveAspectRatio="none">
          <path d="M0,80 C180,120 380,40 600,80 C820,120 1020,40 1200,80 L1200,140 L0,140 Z" />
        </svg>
        <svg className="waves front" viewBox="0 0 1200 140" preserveAspectRatio="none">
          <path d="M0,92 C200,132 400,52 600,92 C800,132 1000,52 1200,92 L1200,140 L0,140 Z" />
        </svg>

        {/* 빙산 */}
        <svg className="iceberg" viewBox="0 0 1200 700" aria-hidden>
          <defs>
            {/* 위쪽 팁(빙설) */}
            <linearGradient id="tipGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#f5fbff" />
              <stop offset="1" stopColor="#cfe4ff" />
            </linearGradient>
            {/* 아래쪽 덩어리(차갑고 깊게) */}
            <linearGradient id="massGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#8ab7ff" stopOpacity=".95" />
              <stop offset=".7" stopColor="#5c8ef0" stopOpacity=".92" />
              <stop offset="1" stopColor="#4474d8" stopOpacity=".92" />
            </linearGradient>
            {/* 절벽 가장자리 하이라이트 */}
            <linearGradient id="rimGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#ffffff" stopOpacity=".9" />
              <stop offset="1" stopColor="#ffffff" stopOpacity=".0" />
            </linearGradient>
            {/* 팁 뒤쪽 광후광(배경과 분리) */}
            <radialGradient id="haloGrad" cx="50%" cy="35%" r="35%">
              <stop offset="0" stopColor="#cfe6ff" stopOpacity=".45" />
              <stop offset="1" stopColor="#cfe6ff" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* 팁 후광 */}
          <ellipse cx="600" cy="220" rx="220" ry="120" fill="url(#haloGrad)" />

          {/* 위쪽 팁 – 곡면/절벽 느낌으로 경사선 */}
          <g className="berg tip">
            <path
              fill="url(#tipGrad)" stroke="#ffffff80" strokeWidth="1"
              d="
                M520,245
                C560,210 590,180 600,170
                C610,180 640,210 680,245
                L740,285 L460,285 Z
              "
            />
            {/* 절벽선 하이라이트 */}
            <path
              d="M520,245 C560,210 590,180 600,170 C610,180 640,210 680,245"
              stroke="url(#rimGrad)" strokeWidth="4" fill="none" opacity=".8"
            />
          </g>

          {/* 아래쪽 대형 덩어리 – 곡선으로 유빙 형태 */}
          <g className="berg mass">
            <path
              fill="url(#massGrad)" stroke="#9fc1ff40" strokeWidth="1"
              d="
                M600,305
                C750,360 860,430 970,500
                C905,565 825,625 720,680
                C640,700 560,700 480,680
                C375,625 295,565 230,500
                C340,430 450,360 600,305 Z
              "
            />
          </g>
        </svg>

        {/* 수면 위 라벨(가독성 ↑) */}
        {ABOVE.map((c, i) => (
          <span
            key={`a${i}`}
            className="chip up"
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
          >
            {c.label}
          </span>
        ))}

        {/* 수면 아래 라벨 */}
        {BELOW.map((c, i) => (
          <span
            key={`b${i}`}
            className="chip down"
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
          >
            {c.label}
          </span>
        ))}

      </div>
    </div>
  );
}
