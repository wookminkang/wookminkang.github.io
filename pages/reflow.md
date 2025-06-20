# Reflow (리플로우)

Reflow는 웹 페이지에서 DOM 요소가 추가되거나, 크기나 위치가 바뀌면  
브라우저가 전체 또는 일부 **레이아웃을 다시 계산**하는 과정을 말함.  
렌더링에 직접 영향을 주기 때문에 자주 발생하면 **성능 저하**나 **화면 멈춤** 같은 문제 생김.


## 실무 경험 (STAR 방식)

### Situation
이전까진 Reflow나 Repaint, Layout Shift 같은 개념은 대충 알고만 있었음.  
데이터 양도 적고, 페이지도 간단해서 딱히 체감 못 했음.

근데 지금 회사에선 하루 접속자 수가 2,000 ~ 5,000명 정도인데,  
특정 이벤트가 발생하거나 브라우저 창을 확대/축소하면  
**화면이 멈추거나 끊기는 현상 생김.**

### Task
- 자주 발생하는 리플로우 줄여서 브라우저 성능 최적화
- 유저가 조작할 때 끊김 없이 부드럽게 작동하도록 개선

### Action
1. 크롬 개발자 도구에서 **Rendering → Paint Flashing** 기능 켜고  
   어떤 요소에서 Reflow가 일어나는지 **확인해가며 추적함.**
2. 테이블 구조에서 문제 발견함.  
   사용자가 브라우저 창을 줄이거나 확대하면,  
   테이블 전체가 반응하면서 **리플로우가 과도하게 발생**, 화면 멈춤 생김.  
   → 테이블에 `overflow: auto` 적용해서 **스크롤로 분리함.**  
   → 레이아웃 전체가 아니라 **내부 영역만 갱신되게 수정함.**
3. 페이지 로딩 후 이미지나 데이터를 불러올 때  
   콘텐츠 위치가 뚝뚝 끊기듯 밀리는 현상 생김.  
   → 이미지, 광고 요소에 `min-height` 설정해서 자리 먼저 확보함  
   → 비동기 렌더링되는 컴포넌트는 **Skeleton UI**로 공간 고정해둠

### Result
- 리플로우 발생 빈도 줄어들고, **화면 멈춤 현상 사라짐**
- 유저 입장에서 체감되는 렌더링 속도 훨씬 안정적으로 바뀜
- Lighthouse 렌더링 성능 점수도 좋아짐


## 핵심 요약

| 항목 | 설명 | 예시 |
|------|------|------|
| Reflow | 브라우저가 레이아웃을 다시 계산하는 렌더링 단계 | DOM 구조 변경, 위치나 크기 조정 |
| 발생 원인 | `width`, `height`, `margin`, `padding`, `display`, `position` 같은 속성 변경 |
| 해결 방법 | DOM 조작 최소화, Skeleton UI 사용, 이미지/광고 크기 고정, 스크롤 영역 분리 |
| 확인 방법 | Chrome DevTools → Rendering → Paint Flashing 체크 |


## 참고

- [Google Web.dev - Layout Shift](https://web.dev/cls/)
- [MDN - Reflow and Repaint](https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work#reflows_and_repaints)
