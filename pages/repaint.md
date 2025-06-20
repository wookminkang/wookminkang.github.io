# Repaint (리페인트)

## 리페인트란?

Repaint는 DOM 구조나 레이아웃 계산은 건드리지 않고,  
**시각적으로만 변화가 생길 때** 브라우저가 요소를 다시 그리는 과정을 말함.  
예를 들어, 색상이나 그림자, 테두리 등 스타일만 바꿨을 때 발생함.  
Reflow보다는 덜 무겁지만, 이것도 반복되면 성능에 영향 생김.


## 실무 경험 (STAR 방식)

### Situation  
처음엔 색상만 바꾸거나 hover 효과 정도는 성능에 거의 영향 없다고 생각했음.  
근데 리스트가 많은 화면에서 마우스 오버 이벤트가 많아지자  
**스크롤이 버벅이고** 브라우저 반응도 느려짐.  
DevTools에서 Paint 영역 확인해보니 계속 리페인트가 일어나고 있었음.

### Task  
- 마우스 오버 등 UI 반응이 잦은 영역에서 리페인트 최적화
- 불필요한 시각적 변경 줄이고, 필요한 경우엔 최대한 가볍게 처리

### Action  
1. 마우스 오버 시 컬러, 배경색, border, box-shadow 등 스타일이 자주 바뀌는 부분에서  
   **리페인트 계속 발생하는 거 확인함.**
2. UI 상태 전환을 `transform`, `opacity` 위주로 바꾸면 GPU 가속이 적용된다는 점 발견함  
   → 기존에 color나 border로 처리하던 hover 효과를 **`opacity`, `transform: scale()`** 등으로 수정함  
   → CSS transition도 `top`, `left` 대신 `transform`으로 변경함
3. `will-change` 속성도 같이 적용해서 미리 GPU 준비하게끔 함

### Result  
- 리스트에서 마우스 오버할 때 버벅임이 사라짐  
- 스크롤 부드러워지고, 애니메이션도 훨씬 자연스러워짐  
- Lighthouse에서 rendering 관련 항목 점수 향상됨


## 핵심 요약

| 항목 | 설명 | 예시 |
|------|------|------|
| Repaint | 시각적 속성만 변경되어 요소를 다시 그림 | color, background, box-shadow 등 |
| 발생 원인 | 스타일 변경 (`color`, `border`, `shadow`) 등이 잦을 경우 |
| 해결 방법 | `transform`, `opacity` 활용한 GPU 가속 / `will-change` 활용 / 불필요한 스타일 변경 제거 |
| 확인 방법 | Chrome DevTools → Rendering → Paint Flashing 켜고 확인 |


## 참고

- [MDN - Reflow and Repaint](https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work#reflows_and_repaints)
- [CSStriggers - 어떤 속성이 Reflow/Repaint를 발생시키는지](https://csstriggers.com/)
