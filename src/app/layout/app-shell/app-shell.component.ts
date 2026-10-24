import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { map } from 'rxjs';
import { SafetyModeService } from '@core/safety/safety-mode.service';
import { OfflineBannerComponent, SessionTimeoutDialogComponent } from '@shared/ui';
import { BottomNavComponent } from '../bottom-nav/bottom-nav.component';
import { IconRailComponent } from '../icon-rail/icon-rail.component';
import { BOTTOM_NAV_ITEMS, MAIN_NAV_ITEMS } from '../nav/nav-items';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopBarComponent } from '../top-bar/top-bar.component';

/**
 * App shell – the persistent chrome that wraps every authenticated screen.
 *
 * Layout breakpoints (matching spec §2.1 and design tokens):
 *  ≥1024 px  →  full sidebar (240 px) + content
 *  600–1023 px  →  icon rail (64 px) + content
 *  <600 px   →  top bar + content + bottom navigation bar
 */
@Component({
  selector: 'pp-app-shell',
  imports: [
    RouterOutlet,
    SidebarComponent,
    IconRailComponent,
    BottomNavComponent,
    TopBarComponent,
    OfflineBannerComponent,
    SessionTimeoutDialogComponent,
  ],
  template: `
    <!-- Skip to main content link for keyboard / screen-reader accessibility -->
    <a href="#main-content" class="skip-link pp-skip-link">Skip to main content</a>

    <!-- ACC-SCR-24: Offline banner -->
    <pp-offline-banner />

    @if (isWide()) {
      <!-- ≥1024 px: sidebar layout -->
      <div class="shell shell--sidebar">
        <pp-sidebar
          [items]="mainNavItems"
          [safetyModeEnabled]="safetyModeEnabled()"
          class="shell-sidebar"
        />
        <div class="shell-body">
          <pp-top-bar
            [householdName]="householdName()"
            [householdMode]="householdMode()"
            [timeZone]="timeZone()"
            [userDisplayName]="userDisplayName()"
            [safetyModeEnabled]="safetyModeEnabled()"
            (userMenuClicked)="onUserMenu()"
          />
          <main id="main-content" class="shell-content" tabindex="-1">
            <router-outlet />
          </main>
        </div>
      </div>
    } @else if (isMedium()) {
      <!-- 600–1023 px: icon rail layout -->
      <div class="shell shell--rail">
        <pp-icon-rail
          [items]="mainNavItems"
          [safetyModeEnabled]="safetyModeEnabled()"
          class="shell-rail"
        />
        <div class="shell-body">
          <pp-top-bar
            [householdName]="householdName()"
            [householdMode]="householdMode()"
            [timeZone]="timeZone()"
            [userDisplayName]="userDisplayName()"
            [safetyModeEnabled]="safetyModeEnabled()"
            (userMenuClicked)="onUserMenu()"
          />
          <main id="main-content" class="shell-content" tabindex="-1">
            <router-outlet />
          </main>
        </div>
      </div>
    } @else {
      <!-- <600 px: bottom nav layout -->
      <div class="shell shell--mobile">
        <pp-top-bar
          [householdName]="householdName()"
          [householdMode]="householdMode()"
          [timeZone]="timeZone()"
          [userDisplayName]="userDisplayName()"
          [safetyModeEnabled]="safetyModeEnabled()"
          (userMenuClicked)="onUserMenu()"
        />
        <main id="main-content" class="shell-content" tabindex="-1">
          <router-outlet />
        </main>
        <pp-bottom-nav [items]="bottomNavItems" />
      </div>
    }

    <!-- ACC-SCR-25: Session timeout warning dialog -->
    <pp-session-timeout-dialog
      [open]="sessionTimeoutWarningOpen()"
      [secondsRemaining]="sessionTimeoutSecondsRemaining()"
      (signOut)="onSessionSignOut()"
      (staySignedIn)="onSessionStaySignedIn()"
    />
  `,
  styles: `
    :host {
      display: block;
      height: 100dvh;
    }

    /* ── Shared shell container ── */
    .shell {
      display: flex;
      height: 100%;
      overflow: hidden;
    }

    /* ── Sidebar (wide) ── */
    .shell--sidebar .shell-sidebar {
      width: 240px;
      flex-shrink: 0;
    }

    /* ── Icon-rail (medium) ── */
    .shell--rail .shell-rail {
      width: 64px;
      flex-shrink: 0;
    }

    /* ── Mobile ── */
    .shell--mobile {
      flex-direction: column;
    }

    /* ── Body (right of sidebar / rail) ── */
    .shell-body {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-width: 0;
      overflow: hidden;
    }

    /* ── Scrollable content region ── */
    .shell-content {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      /* remove default outline – focus is managed by skip link */
      outline: none;
    }
  `,
  host: {
    '(window:keydown)': 'onKeydown($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShellComponent {
  /* ── Nav data ── */
  public readonly mainNavItems = MAIN_NAV_ITEMS;
  public readonly bottomNavItems = BOTTOM_NAV_ITEMS;

  /* ── Breakpoint signals ── */
  private readonly _bp = inject(BreakpointObserver);
  private readonly _safety = inject(SafetyModeService);
  private _lastEscapeTime = 0;

  private readonly _isWide = toSignal(
    this._bp.observe('(min-width: 1024px)').pipe(map((s) => s.matches)),
    { initialValue: false },
  );

  private readonly _isMedium = toSignal(
    this._bp.observe('(min-width: 600px) and (max-width: 1023px)').pipe(map((s) => s.matches)),
    { initialValue: false },
  );

  public readonly isWide = computed(() => this._isWide());
  public readonly isMedium = computed(() => !this._isWide() && this._isMedium());

  /* ── Household/user state ── */
  public readonly householdName = signal('My Household');
  public readonly householdMode = signal<'linked' | 'solo'>('solo');
  public readonly timeZone = signal(Intl.DateTimeFormat().resolvedOptions().timeZone);
  public readonly userDisplayName = signal('You');

  /* ── Safety Mode ── */
  public readonly safetyModeEnabled = computed(() => this._safety.safetyModeActive());

  /* ── Session timeout state (ACC-SCR-25) ── */
  public readonly sessionTimeoutWarningOpen = signal(false);
  public readonly sessionTimeoutSecondsRemaining = signal(120);

  public onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      const now = Date.now();
      // Double Escape pressed within 800ms triggers immediate Exit now
      if (now - this._lastEscapeTime < 800) {
        this._safety.exitNow();
      }
      this._lastEscapeTime = now;
    }
  }

  public onUserMenu(): void {
    // Phase 1 user menu
  }

  public onSessionSignOut(): void {
    this.sessionTimeoutWarningOpen.set(false);
  }

  public onSessionStaySignedIn(): void {
    this.sessionTimeoutWarningOpen.set(false);
  }
}
