

# 브라우저 렌더링 연계
매우 중요하므로 반드시 알아둬야함 내용은 알고있지만 말로 설명하기 어려운 부분이 있음...ㅜㅜ


## 1. `Reflow`와 `Repaint` 차이와 최적화 방법

- ```**Reflow (Layout)**```
  * 모든 엘리먼트의 위치나 길이, 크기 등등을 다시 계산하는 과정
  * 상위 엘리먼트를 변경시키면 하위 엘리먼트에도 영향을 끼침
  * render tree를 재생성하므로 부하가 크고 레이아웃에 영향을 줌
  * DOM노드를 추가, 제거 , 업데이트하는 경우 발생 




- ```**Repaint (Paint)**```  
  * 레이아웃에 영향을 주지않지만 눈에 보이는 요소들(background-color, color, visibility,..)이 변경됨
  * reflow 보다는 부하가 크지는 않음




```Repaint가 발생하는 css 속성들```
| background | background-image | background-position | background-repeat | background-size |
| ---------- | ---------------- | ------------------- | ----------------- | --------------- |
| border-radius | border-style | box-shadow | color | inilne-style |
| ountline | outline-color | outline-style | text-decorariont |
| visibility | ... |


- ```**최적화 팁**```    
  * 레이아웃에 영향을 주는 속성 변경을 최소화 (ex. width, height, margin)  
  * 브라우저 창 크기를 조정하면서 폰트 페밀리나 padding, margin, img 크기 변경은 최소화


## 2. JavaScript가 렌더링에 끼치는 영향

- `**렌더링 차단 스크립트**`
  - `<script>` 태그가 HTML 파싱을 멈추고 JS를 실행  
  - 렌더링 지연 발생

- **async, defer, 동기 스크립트 차이**  

 | 종류   | HTML 파싱 차단 | 실행 시점                      |
  |--------|----------------|-------------------------------|
  | 동기    | O              | 스크립트 위치에서 즉시 실행    |
  | async  | X              | 다운로드 후 즉시 실행          |
  | defer  | X              | HTML 파싱 끝난 후 실행         |

- **실제 적용법**  
  - 중요한 스크립트는 defer로 두기  
  - 외부 라이브러리는 async 고려  
  - 인라인 스크립트는 최소화


## 3. 웹 성능 측정과 개선 도구 활용법

- **Lighthouse**  
  - 구글 크롬 내장 성능 분석 도구  
  - 성능, 접근성, SEO, Best Practices 점수 제공

- **DevTools Performance 탭**  
  - 렌더링 단계별 프로파일링  
  - Reflow/Repaint 발생 위치 확인 가능

- **WebPageTest**  
  - 실제 사용자 환경 기반 페이지 로딩 속도 측정  
  - 상세한 로딩 타임라인과 개선점 제공

- **렌더링 최적화 진단 팁**  
  - 긴 렌더링 작업 찾아 쪼개기  
  - 렌더 차단 리소스 최소화  
  - 이미지, 폰트 최적화 병행


## 마무리

브라우저 렌더링 최적화는 사용자 경험 직결이라  
개발하면서 꼭 이해하고 개선할 부분.  

매일 조금씩 정리해 나가면서  
실무 코드에 바로 적용 가능한 팁들을  
꾸준히 공유해 보자!