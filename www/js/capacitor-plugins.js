// Capacitor Plugin Registration for ha9iba app
// This file manually registers plugins since we don't use a bundler
// Capacitor 6 auto-registers only when using Webpack/Vite

(function() {
  'use strict';
  
  // Wait for Capacitor to be ready
  function registerPlugins() {
    if (!window.Capacitor) {
      console.warn('[ha9iba-plugins] Capacitor not available - running in browser');
      return;
    }
    
    console.log('[ha9iba-plugins] Registering Capacitor plugins...');
    
    // Register Filesystem plugin
    try {
      if (!window.Capacitor.Plugins) window.Capacitor.Plugins = {};
      if (!window.Capacitor.Plugins.Filesystem && typeof window.Capacitor.registerPlugin === 'function') {
        window.Capacitor.Plugins.Filesystem = window.Capacitor.registerPlugin('Filesystem');
        console.log('[ha9iba-plugins] Filesystem plugin registered');
      }
    } catch(e) {
      console.warn('[ha9iba-plugins] Filesystem registration failed:', e);
    }
    
    // Register Share plugin
    try {
      if (!window.Capacitor.Plugins) window.Capacitor.Plugins = {};
      if (!window.Capacitor.Plugins.Share && typeof window.Capacitor.registerPlugin === 'function') {
        window.Capacitor.Plugins.Share = window.Capacitor.registerPlugin('Share');
        console.log('[ha9iba-plugins] Share plugin registered');
      }
    } catch(e) {
      console.warn('[ha9iba-plugins] Share registration failed:', e);
    }
    
    // Register Browser plugin
    try {
      if (!window.Capacitor.Plugins) window.Capacitor.Plugins = {};
      if (!window.Capacitor.Plugins.Browser && typeof window.Capacitor.registerPlugin === 'function') {
        window.Capacitor.Plugins.Browser = window.Capacitor.registerPlugin('Browser');
        console.log('[ha9iba-plugins] Browser plugin registered');
      }
    } catch(e) {
      console.warn('[ha9iba-plugins] Browser registration failed:', e);
    }
    
    console.log('[ha9iba-plugins] Available plugins:', Object.keys(window.Capacitor.Plugins || {}));
    console.log('[ha9iba-plugins] isNativePlatform:', window.Capacitor.isNativePlatform ? window.Capacitor.isNativePlatform() : false);
  }
  
  // Try to register immediately if Capacitor is already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', registerPlugins);
  } else {
    registerPlugins();
  }
  
  // Also try after a small delay (Capacitor bridge might load late)
  setTimeout(registerPlugins, 500);
  setTimeout(registerPlugins, 2000);
})();
