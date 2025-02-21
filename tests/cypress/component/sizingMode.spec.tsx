import React from 'react';
import { mount } from '@cypress/react';
import HoverVideoPlayer from 'react-hover-video-player';

import { makeMockVideoSrc } from '../utils';
import {
  videoElementSelector,
  pausedOverlayWrapperSelector,
  loadingOverlayWrapperSelector,
  hoverOverlayWrapperSelector,
  playerContainerSelector,
} from '../constants';

const videoAspectRatio = 16 / 9;

describe('sizingMode prop', () => {
  it("the player should be styled for the 'video' sizing mode by default", () => {
    mount(
      <HoverVideoPlayer
        videoSrc={makeMockVideoSrc()}
        videoStyle={{
          width: 200,
        }}
        pausedOverlay={
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'red',
            }}
            data-testid="paused-overlay"
          >
            PAUSED
          </div>
        }
        loadingOverlay={
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'yellow',
            }}
            data-testid="loading-overlay"
          >
            LOADING
          </div>
        }
        hoverOverlay={
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 255, 255, 0.7)',
            }}
            data-testid="hover-overlay"
          >
            HOVER
          </div>
        }
      />
    );

    let videoElementHeight;

    cy.get(videoElementSelector).should(($video: JQuery<HTMLVideoElement>) => {
      const videoElement = $video[0];
      expect(videoElement.readyState).to.be.gte(HTMLMediaElement.HAVE_METADATA);
      expect(videoElement).to.have.css('width', '200px');

      // The video's height should match the native aspect ratio
      // Since it's hard to perfectly predict how the browser will handle sub-pixels,
      // we'll just check that it's accurate wihin 5% of a pixel
      videoElementHeight = parseFloat(
        window.getComputedStyle(videoElement).height
      );
      expect(videoElementHeight).to.be.closeTo(200 / videoAspectRatio, 0.05);
    });

    cy.get(playerContainerSelector).should(
      ($container: JQuery<HTMLDivElement>) => {
        const playerContainer = $container[0];
        expect(playerContainer).to.have.css('width', '200px');

        const playerContainerHeight = parseFloat(
          window.getComputedStyle(playerContainer).height
        );
        expect(playerContainerHeight).to.be.closeTo(videoElementHeight, 0.001);
      }
    );
    cy.get(pausedOverlayWrapperSelector).should(
      ($pausedOverlayWrapper: JQuery<HTMLDivElement>) => {
        const pausedOverlayWrapper = $pausedOverlayWrapper[0];
        expect(pausedOverlayWrapper).to.have.css('width', '200px');

        const pausedOverlayWrapperHeight = parseFloat(
          window.getComputedStyle(pausedOverlayWrapper).height
        );
        expect(pausedOverlayWrapperHeight).to.be.closeTo(
          videoElementHeight,
          0.001
        );
      }
    );
    cy.get('[data-testid="paused-overlay"]').should(
      ($pausedOverlay: JQuery<HTMLDivElement>) => {
        const pausedOverlay = $pausedOverlay[0];
        expect(pausedOverlay).to.have.css('width', '200px');

        const pausedOverlayHeight = parseFloat(
          window.getComputedStyle(pausedOverlay).height
        );
        expect(pausedOverlayHeight).to.be.closeTo(videoElementHeight, 0.001);
      }
    );

    // The loading overlay should be sized to match the paused overlay's dimensions
    cy.get('[data-testid="loading-overlay"]').should(
      ($loadingOverlay: JQuery<HTMLDivElement>) => {
        const loadingOverlay = $loadingOverlay[0];
        expect(loadingOverlay).to.have.css('width', '200px');

        const loadingOverlayHeight = parseFloat(
          window.getComputedStyle(loadingOverlay).height
        );
        expect(loadingOverlayHeight).to.be.closeTo(videoElementHeight, 0.001);
      }
    );
    // The hover overlay should be sized to match the paused overlay's dimensions
    cy.get('[data-testid="hover-overlay"]').should(
      ($hoverOverlay: JQuery<HTMLDivElement>) => {
        const hoverOverlay = $hoverOverlay[0];
        expect(hoverOverlay).to.have.css('width', '200px');

        const hoverOverlayHeight = parseFloat(
          window.getComputedStyle(hoverOverlay).height
        );
        expect(hoverOverlayHeight).to.be.closeTo(videoElementHeight, 0.001);
      }
    );
  });

  it("the player should be styled correctly for the 'overlay' sizing mode", () => {
    mount(
      <HoverVideoPlayer
        videoSrc={makeMockVideoSrc()}
        sizingMode="overlay"
        pausedOverlay={
          <div
            style={{
              width: 300,
              height: 100,
              backgroundColor: 'red',
            }}
            data-testid="paused-overlay"
          >
            PAUSED
          </div>
        }
        loadingOverlay={
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'yellow',
            }}
            data-testid="loading-overlay"
          >
            LOADING
          </div>
        }
        hoverOverlay={
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 255, 255, 0.7)',
            }}
            data-testid="hover-overlay"
          >
            HOVER
          </div>
        }
      />
    );

    // The paused overlay should be sized correctly
    cy.get(pausedOverlayWrapperSelector)
      .should('have.css', 'width', '300px')
      .should('have.css', 'height', '100px');
    cy.get('[data-testid="paused-overlay"]')
      .should('have.css', 'width', '300px')
      .should('have.css', 'height', '100px');

    // The video element should be sized to match the paused overlay's dimensions
    cy.get(videoElementSelector)
      .should('have.css', 'width', '300px')
      .should('have.css', 'height', '100px');

    // The container should be sized to match the paused overlay's dimensions
    cy.get(playerContainerSelector)
      .should('have.css', 'width', '300px')
      .should('have.css', 'height', '100px');

    // The loading overlay should be sized to match the paused overlay's dimensions
    cy.get(loadingOverlayWrapperSelector)
      .should('have.css', 'width', '300px')
      .should('have.css', 'height', '100px');
    cy.get('[data-testid="loading-overlay"]')
      .should('have.css', 'width', '300px')
      .should('have.css', 'height', '100px');

    // The hover overlay should be sized to match the paused overlay's dimensions
    cy.get(hoverOverlayWrapperSelector)
      .should('have.css', 'width', '300px')
      .should('have.css', 'height', '100px');
    cy.get('[data-testid="hover-overlay"]')
      .should('have.css', 'width', '300px')
      .should('have.css', 'height', '100px');
  });

  it("the player should be styled correctly for the 'container' sizing mode", () => {
    mount(
      <HoverVideoPlayer
        videoSrc={makeMockVideoSrc()}
        sizingMode="container"
        style={{
          width: 100,
          height: 200,
        }}
        pausedOverlay={
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'red',
            }}
            data-testid="paused-overlay"
          >
            PAUSED
          </div>
        }
        loadingOverlay={
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'yellow',
            }}
            data-testid="loading-overlay"
          >
            LOADING
          </div>
        }
        hoverOverlay={
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 255, 255, 0.7)',
            }}
            data-testid="hover-overlay"
          >
            HOVER
          </div>
        }
      />
    );

    // The container should be sized correctly
    cy.get(playerContainerSelector)
      .should('have.css', 'width', '100px')
      .should('have.css', 'height', '200px');

    // The video element should be sized to match the container's dimensions
    cy.get(videoElementSelector)
      .should('have.css', 'width', '100px')
      .should('have.css', 'height', '200px');

    // The paused overlay should be sized to match the container's dimensions
    cy.get(pausedOverlayWrapperSelector)
      .should('have.css', 'width', '100px')
      .should('have.css', 'height', '200px');
    cy.get('[data-testid="paused-overlay"]')
      .should('have.css', 'width', '100px')
      .should('have.css', 'height', '200px');

    // The loading overlay should be sized to match the container's dimensions
    cy.get(loadingOverlayWrapperSelector)
      .should('have.css', 'width', '100px')
      .should('have.css', 'height', '200px');
    cy.get('[data-testid="loading-overlay"]')
      .should('have.css', 'width', '100px')
      .should('have.css', 'height', '200px');

    // The hover overlay should be sized to match the container's dimensions
    cy.get(hoverOverlayWrapperSelector)
      .should('have.css', 'width', '100px')
      .should('have.css', 'height', '200px');
    cy.get('[data-testid="hover-overlay"]')
      .should('have.css', 'width', '100px')
      .should('have.css', 'height', '200px');
  });
});
