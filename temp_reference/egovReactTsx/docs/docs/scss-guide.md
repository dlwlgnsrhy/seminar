# SCSS (Sass) 쉬운 사용 가이드

이 문서는 SCSS를 처음 접하거나 익숙하지 않은 주니어 개발자를 위해, **"왜 쓰는지"**와 **"어떻게 쓰면 좋은지"**를 쉽게 설명합니다.

## 1. SCSS가 뭔가요?

CSS는 문법이 단순하지만, 프로젝트가 커지면 코드가 너무 길어지고 관리하기 힘들어집니다.
SCSS는 **"CSS의 확장판"**입니다. 변수, 중첩(Nesting) 같은 프로그래밍적인 기능을 더해서 CSS를 더 똑똑하게 짤 수 있게 해줍니다.

## 2. 파일 만들기 (CSS Modules)

우리는 **CSS Modules**라는 방식을 씁니다.
이게 뭐냐면, **"이 스타일 파일은 이 컴포넌트에서만 쓸 거야!"** 라고 이름표를 붙이는 겁니다.

- **파일명**: `[컴포넌트이름].module.scss` (예: `Button.module.scss`)
- **사용법**:

  ```tsx
  import styles from './Button.module.scss';

  // styles.primaryButton 처럼 객체로 꺼내 씁니다.
  // 실제로는 'Button_primaryButton__xyz123' 같은 고유한 클래스명이 됩니다.
  <button className={styles.primaryButton}>Click me</button>;
  ```

## 3. 핵심 기능 3가지

### (1) 중첩 (Nesting): "상자 안에 상자 넣기"

CSS에서는 자식 요소를 선택할 때마다 부모 이름을 계속 써야 했습니다.
SCSS에서는 중괄호 `{}` 안에 넣으면 됩니다.

**CSS (Before)**

```css
.card {
  padding: 20px;
}
.card .title {
  font-size: 20px;
}
.card .content {
  color: gray;
}
```

**SCSS (After)**

```scss
.card {
  padding: 20px;

  .title {
    font-size: 20px;
  }

  .content {
    color: gray;
  }
}
```

> **주의!** 너무 깊게(3단계 이상) 들어가지 마세요. 코드를 읽기 힘들어집니다.

### (2) 상위 선택자 참조 (`&`): "나 자신"

`&` 기호는 **"지금 내가 있는 곳의 클래스 이름"**을 가리킵니다.
주로 마우스를 올렸을 때(`:hover`)나, 특정 상태일 때 스타일을 줄 때 씁니다.

```scss
.button {
  background: blue;

  // .button:hover 와 같습니다.
  &:hover {
    background: darkblue;
  }

  // .button.active 와 같습니다.
  &.active {
    border: 2px solid yellow;
  }
}
```

### (3) 변수 (Variables): "별명 붙이기"

자주 쓰는 색상이나 크기에 이름을 붙여두면, 나중에 한 번에 바꾸기 쉽습니다.

```scss
// _variables.scss (변수 모음 파일)
$primary-color: #007bff;
$spacing-base: 16px;

// 사용
.box {
  background-color: $primary-color; // #007bff
  padding: $spacing-base; // 16px
}
```

## 4. 꿀팁 (Best Practices)

1. **클래스 이름은 BEM으로**: 비록 CSS Modules를 쓰더라도, 클래스 이름은 의미 있게 지어주세요.
   - `.card` (블록)
   - `.card__title` (요소)
   - `.card--featured` (상태/변형)
2. **공통 스타일은 Mixin으로**: "중앙 정렬"처럼 맨날 쓰는 코드는 `mixin`으로 만들어두고 불러오세요(`@include`).
