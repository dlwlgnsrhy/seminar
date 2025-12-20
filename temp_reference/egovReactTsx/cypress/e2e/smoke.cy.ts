/**
 * Cypress Smoke Test
 * - 목적: 빌드된 앱이 실제로 라우팅 및 렌더링 가능한지 확인
 * - 구성:
 * 1. "/" -> Dashboard 리다이렉트 확인
 * 2. "/dashboard" -> DashboardPage 진입 확인
 * 3. "/profile" -> ProfilePage 진입 확인
 * 4. 404 처리 확인
 */

describe('Smoke E2E Test', () => {
  beforeEach(() => {
    // 베이스 URL은 cypress.config.ts에서 설정됨
    cy.visit('/');
  });

  it('redirects to /dashboard from root', () => {
    cy.url().should('include', '/dashboard');
    cy.contains(/Dashboard/i).should('be.visible');
  });

  it('renders Dashboard page', () => {
    cy.visit('/dashboard');
    cy.contains(/Dashboard/i).should('be.visible');
  });

  it('navigates to Profile page', () => {
    cy.visit('/profile');
    cy.contains(/홍길동/i).should('be.visible');
  });

  it('handles 404 gracefully', () => {
    cy.visit('/nonexistent', { failOnStatusCode: false });
    cy.contains(/Not Found/i).should('be.visible');
  });
});
