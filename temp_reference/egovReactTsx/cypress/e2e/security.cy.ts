/**
 * @파일설명 : Cypress로 로그인 흐름 간단 검증(특히 XSRF 헤더 포함 여부 확인)
 * @역할 : 로그인 이후 민감한 상태 변경 POST 요청에 X-XSRF-TOKEN 헤더가 포함되는지 검사
 * @아키텍처원칙 : E2E에서 실제 브라우저 쿠키 동작을 확인하여 Double-Submit 동작 보증
 * @커스터마이징 : 로그인 절차 및 엔드포인트는 프로젝트에 맞춰 변경
 */

describe('Security: CSRF Double-Submit', () => {
  it('includes X-XSRF-TOKEN header for state changing requests', () => {
    cy.visit('/'); // 앱 진입

    // (옵션) 로그인 자동화가 필요하면 여기에 로그인 절차 추가
    // 예 : cy.get('input[name="email"]').type('test@test.com');

    cy.request({
      method: 'GET',
      url: '/api/auth/issue-xsrf', //서버가 XSRF-TOKEN 쿠키를 발급한다고 가정
    }).then(() => {
      //이제 상태 변경 요청을 보내고 요청에 헤더가 있는지 확인
      cy.intercept('POST', '/api/profile/update').as('updateProfile');

      cy.request({
        method: 'POST',
        url: '/api/profile/update',
        body: { displayName: 'cypress-test' },
        headers: {
          //실제 브라우저에서 XSRF-TOKEN을 읽어 header에 넣는 것은 client code 책임이므로,
          // 이 테스트는 인트로 단계로 동작 확인용
        },
      });

      cy.wait('@updateProfile')
        .its('request.headers')
        .then((headers) => {
          expect(headers).to.have.property('x-xsrf-token');
        });
    });
  });
});
