<!--
slot : 부모노드에서 자식노드에 임의의 컨텐츠를 삽입하는 방법
컴포넌트 재사용, 일관된 UI
부모 컴포넌트가 콘텐츠를 삽입할 공간을 자식 노드의 템플릿 영역에 <slot> 으로 제공해 주면 됨
-->
<template>
  <div class="p-4">
    <header>
      <h4 class="font-italic">
        <slot name="header"></slot>
      </h4>
    </header>
    
    <main>
      <slot></slot>
    </main>

    <footer>
      <slot name="footer">
        <hr/>
        <!-- 기본값 -> 부모 컴포넌트가 컨텐츠를 삽입하지 않으면 선이 그어짐 -->
      </slot>
    </footer>
  </div>
</template>
