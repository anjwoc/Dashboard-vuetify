# 졸업작품 : 대기전력 차단 시스템

> 191108

처음 만들기 시작할 때 어떤 정보가 필요한지 제대로 설계를 안해서 노드가 확장될 때 문제가 생김 1차 심사 후 리팩토링 필요
1. 로그인하고 새로고침하면 로그인 풀리는거 해결
2. 로그인할 때 노드 별 관련정보 모두 포함해서 vuex store에 저장
3. 하드코딩 된 파일들을 vuex에 저장된 state를 이용해서 생성되도록 수정
4. Optional
    * 환경설정 카드들을 노드 페이지에 두지말고 환경설정만 하는 페이지를 따로 만들지 고민하기
    * 노드 페이지를 컴포넌트로 분할해서 코드 수 줄이기




