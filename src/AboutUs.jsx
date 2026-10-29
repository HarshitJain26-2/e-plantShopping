import React from 'react';
import { Leaf, Award, HeartHandshake, ShieldCheck } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-header">
        <span className="badge">Welcome to Our Greenhouse</span>
        <h2>Cultivating Green Spaces, Enriching Everyday Lives</h2>
      </div>

      <div className="about-us-content">
        <p className="lead-text">
          At <strong>Paradise Nursery</strong>, we are devoted to connecting people with nature by delivering 
          hand-selected, vibrant houseplants straight to homes and workplaces across India.
        </p>
        <p>
          Founded by passionate horticulturists, our nursery began with a simple belief: every room deserves 
          the calming presence of nature. Whether you are looking to purify your indoor air, infuse gentle botanical 
          aromas into your bedroom, or add resilient greenery to your workspace, our diverse collection has 
          been nurtured with loving care.
        </p>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">
            <Leaf size={28} />
          </div>
          <h3>Hand-Nurtured Plants</h3>
          <p>Every plant is organically grown, potted in nutrient-rich soil, and carefully inspected before dispatch.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <Award size={28} />
          </div>
          <h3>100% Quality Guarantee</h3>
          <p>We ensure that our flora arrives healthy, radiant, and primed to thrive in your indoor microclimates.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <HeartHandshake size={28} />
          </div>
          <h3>Botanical Care Support</h3>
          <p>Receive comprehensive guidance, seasonal watering schedules, and personalized plant doctor tips.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <ShieldCheck size={28} />
          </div>
          <h3>Safe Eco-Packaging</h3>
          <p>Our custom shock-absorbent, sustainable containers protect roots and foliage during swift transit.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
