

# 브라우저 렌더링 과정 정리

웹 페이지는 어떻게 화면에 그려질까요?  
우리가 작성한 HTML, CSS, JavaScript가 실제 브라우저에서 사용자에게 어떻게 보이는지를 이해하는 건 프론트엔드 개발자에게 **필수 지식**입니다.

## 📌 전체 렌더링 플로우

```txt
1. HTML 파싱
2. DOM 생성
3. CSS 파싱 → CSSOM 생성
4. DOM + CSSOM → 렌더 트리(Render Tree) 생성
5. Layout 단계 (각 노드의 위치와 크기 계산)
6. Paint 단계 (픽셀로 변환)
7. Composite 단계 (레이어 조합하여 화면에 출력)
```

-----


### 1. HTML 파싱 → DOM 생성
HTML을 위에서 아래로 한 줄씩 읽으면서
DOM이라는 구조를 만든다.
```html

<html>
  <head>
    <title>mwkang</title>
  </head>
  <body>
    <h1>Hello</h1>
    <p>World</p>
  </body>
</html>
```
→ 이렇게 생긴 트리로 변환:

```html
body
├── h1
└── p

```

-----

### 2. CSS 파싱 → CSSOM 생성
CSS도 별도로 파싱되면서 CSSOM이라는 구조가 만들어진다.
이 구조는 어떤 태그에 어떤 스타일이 들어갈지를 기억하고 있음.

```css
h1 {
  color: red;
}
```

---

### 3. Render Tree 생성
DOM + CSSOM이 결합되어 렌더 트리(Render Tree) 생성.
화면에 보여지는 요소만 포함된다.

예: display: none인 애는 렌더 트리에 포함 안 됨.


-----


### 4. Layout 단계
각 요소의 위치와 크기(width, height, x, y 좌표 등)를 계산.
이걸 보통 Reflow라고도 부름.

DOM을 변경하거나, 스타일 속성 중 레이아웃 영향을 주는 속성 변경하면 이 단계가 다시 실행됨.


-----


### 5. Paint 단계
렌더 트리를 바탕으로 실제로 화면에 색칠하는 작업
텍스트, 배경, 그림자 같은 걸 픽셀로 그리는 단계.


-----


### 실무에서 중요한 포인트
Reflow / Repaint 최소화해야 성능 좋아짐

DOM 읽기/쓰기 섞여있으면 Layout Thrashing 생기니까
읽기 → 쓰기 순으로 묶어서 처리하자

스타일 조작은 class 토글로 해결하는 게 좋음


-----

### 렌더링 최적화 팁.

| 항목      | 최적화 전략 예시                          |
| ------- | ---------------------------------- |
| 이미지     | `loading="lazy"`, `srcset`, 이미지 압축(webp) |
| JS 로딩   | `defer`, `async`, 코드 분할            |
| CSS 최적화 | 미사용 CSS 제거 (purgecss 등)            |
| 애니메이션   | `transform`, `opacity` 중심으로        |


