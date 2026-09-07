import { useEffect } from 'react';

const PAGE_META = {
  home: {
    title: 'AURA — Architectural Atelier & Luxury Interior Design | Tokyo • New York • Milan',
    description: 'Award-winning interior architecture studio crafting timeless, monumental living environments with honest natural materials across Tokyo, New York, and Milan.',
    path: '/',
    type: 'website'
  },
  about: {
    title: 'About Our Atelier & Architectural Philosophy | AURA Studio',
    description: 'Explore AURA’s architectural heritage, our 4 design principles, global partner leadership, and 18-year legacy in Tokyo, Milan, and New York.',
    path: '/about',
    type: 'article'
  },
  projects: {
    title: 'Selected Residences & Architectural Portfolio Archive | AURA',
    description: 'Discover bespoke residential penthouses, alpine chalets, and private pavilions in Tokyo, Tribeca, Lake Como, and Aspen.',
    path: '/projects',
    type: 'website'
  },
  materials: {
    title: 'Materiality Archive & Sensory Provenance | AURA Atelier',
    description: 'Authentic silver travertine, charred yakisugi timber, patinated bronze, and tactile bouclé sourced from historic European and Japanese master workshops.',
    path: '/materials',
    type: 'website'
  },
  services: {
    title: 'Architectural Services & Turnkey Delivery Framework | AURA',
    description: 'Comprehensive interior architecture, spatial planning, zero-tolerance custom millwork, circadian lighting, and white-glove FF&E procurement.',
    path: '/services',
    type: 'website'
  },
  login: {
    title: 'Client Sign In & Project Portal | AURA Atelier',
    description: 'Sign in to access your custom architectural commission files, material specs, and project progress.',
    path: '/login',
    type: 'website'
  },
  register: {
    title: 'Client Registration & Private Consultation Access | AURA',
    description: 'Register for exclusive access to AURA architectural archives and commission private residential interior transformations.',
    path: '/register',
    type: 'website'
  },
  admin: {
    title: 'Studio CMS Portal & Content Management | AURA',
    description: 'Internal content management system for AURA design directors.',
    path: '/admin',
    type: 'website'
  }
};

export default function SeoManager({ currentPage = 'home', selectedProject = null }) {
  useEffect(() => {
    let currentMeta = PAGE_META[currentPage] || PAGE_META.home;

    if (selectedProject) {
      currentMeta = {
        title: `${selectedProject.title} — ${selectedProject.subtitle || ''} | AURA Portfolio`,
        description: selectedProject.tagline || selectedProject.narrative?.slice(0, 160) || currentMeta.description,
        path: `/projects#${selectedProject.id || ''}`,
        type: 'article',
        image: selectedProject.image
      };
    }

    // 1. Update Title
    document.title = currentMeta.title;

    // 2. Helper to set or update meta tag
    const setMetaTag = (attribute, name, content) => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update standard meta
    setMetaTag('name', 'description', currentMeta.description);
    setMetaTag('name', 'title', currentMeta.title);

    // Update OpenGraph
    setMetaTag('property', 'og:title', currentMeta.title);
    setMetaTag('property', 'og:description', currentMeta.description);
    setMetaTag('property', 'og:url', `https://aura-design.com${currentMeta.path}`);
    setMetaTag('property', 'og:type', currentMeta.type);
    if (currentMeta.image) {
      setMetaTag('property', 'og:image', `https://aura-design.com${currentMeta.image}`);
    }

    // Update Twitter
    setMetaTag('name', 'twitter:title', currentMeta.title);
    setMetaTag('name', 'twitter:description', currentMeta.description);
    if (currentMeta.image) {
      setMetaTag('name', 'twitter:image', `https://aura-design.com${currentMeta.image}`);
    }

    // 3. Update Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', `https://aura-design.com${currentMeta.path}`);

    // 4. Dynamic Breadcrumb Schema
    let breadcrumbScript = document.getElementById('dynamic-breadcrumb-schema');
    if (!breadcrumbScript) {
      breadcrumbScript = document.createElement('script');
      breadcrumbScript.id = 'dynamic-breadcrumb-schema';
      breadcrumbScript.type = 'application/ld+json';
      document.head.appendChild(breadcrumbScript);
    }

    const breadcrumbs = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://aura-design.com/'
      }
    ];

    if (currentPage !== 'home') {
      breadcrumbs.push({
        '@type': 'ListItem',
        position: 2,
        name: currentPage.charAt(0).toUpperCase() + currentPage.slice(1),
        item: `https://aura-design.com${currentMeta.path}`
      });
    }

    if (selectedProject) {
      breadcrumbs.push({
        '@type': 'ListItem',
        position: 3,
        name: selectedProject.title,
        item: `https://aura-design.com/projects#${selectedProject.id || ''}`
      });
    }

    breadcrumbScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs
    });

  }, [currentPage, selectedProject]);

  return null;
}
