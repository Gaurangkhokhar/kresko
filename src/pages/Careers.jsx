import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const openings = [
  ['International Business Development Executive', '1 - 3 years', '5'],
  ['Business Development Executive (Domestic)', '1 - 3 years', '5'],
  ['Back-Office Operations', '1 - 3 years', '1'],
  ['Purchase Assistant', '1 - 3 years', '1'],
];

const perks = [
  ['fa-people-group', 'Employees come first, always'],
  ['fa-chart-line', 'Consistent growth opportunities'],
  ['fa-bolt', 'Freedom to pursue and perform'],
  ['fa-scale-balanced', 'Healthy work-life balance'],
  ['fa-handshake', 'Foster healthy professional bonds'],
  ['fa-laptop-code', 'Deliver using the latest technologies'],
  ['fa-arrow-trend-up', 'Increased room for growth'],
  ['fa-star', 'Bring out the best in you'],
];

export default function Careers() {
  const [submitted, setSubmitted] = useState(false);

  const scrollToApplication = () => {
    document.getElementById('career-application')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="careers-reference-page">
      <section className="careers-reference-hero"><div className="container"><span className="careers-kicker">BUILD YOUR FUTURE WITH US</span><h1>Career</h1><p>Join a growing team creating innovative, sustainable and high-performance chemical solutions for a cleaner, safer world.</p></div></section>

      <section className="section careers-openings"><div className="container"><div className="careers-section-heading"><span className="careers-kicker">CURRENT OPENING</span><h2>Make It Matter</h2><p>Explore opportunities to grow your career with Swadesh-style innovation, technical learning and meaningful customer impact.</p></div><div className="opening-table"><div className="opening-row opening-head"><span>Position</span><span>Experience</span><span>Openings</span></div>{openings.map(([title, experience, count]) => <div className="opening-row" key={title}><strong>{title}</strong><span>{experience}</span><span className="opening-count">{count}</span></div>)}</div><p className="hr-note">For more information, contact HR: <a href="tel:+917043797925">+91 70437 97925</a></p><button type="button" onClick={scrollToApplication} className="btn btn-primary career-apply-button">Apply Now <i className="fa-solid fa-arrow-down" /></button></div></section>

      <section className="section career-application" id="career-application"><div className="container application-grid"><div className="application-intro"><span className="careers-kicker">MAKE YOUR NEXT MOVE</span><h2>Bring your ideas, expertise and ambition.</h2><p>We welcome people who care about quality, collaboration and creating better solutions. Share your details and our HR team will get in touch when a suitable opportunity opens.</p><div className="application-note"><i className="fa-solid fa-envelope-open-text" /><span>Send your resume and profile. We review every application with care.</span></div></div><div className="career-form-card"><h3>Apply Now</h3>{submitted && <div className="career-success">Thank you. Your application has been received by our team.</div>}<form onSubmit={handleSubmit}><div className="career-form-grid"><label>First Name *<input required type="text" /></label><label>Last Name *<input required type="text" /></label><label>Your Email *<input required type="email" /></label><label>Mobile Number *<input required type="tel" /></label><label>Previous Company Name *<input required type="text" /></label><label>Total Experience *<input required type="text" placeholder="e.g. 2 years" /></label><label>Current Salary *<input required type="text" /></label><label>Expected Salary *<input required type="text" /></label><label className="career-form-full">Job Title *<select required defaultValue=""><option value="" disabled>Select a position</option>{openings.map(([title]) => <option key={title}>{title}</option>)}</select></label><label className="career-form-full">Resume *<input required type="file" accept=".pdf,.doc,.docx" /></label></div><button type="submit" className="btn btn-primary">Submit Application <i className="fa-solid fa-arrow-right" /></button></form></div></div></section>

      <section className="section careers-perks"><div className="container"><div className="careers-section-heading"><span className="careers-kicker">BENEFITS &amp; PERKS</span><h2>Employees come first, always.</h2><p>We create a workplace where people can learn, contribute, grow and do their best work.</p></div><div className="perks-grid">{perks.map(([icon, title]) => <article className="perk-card" key={title}><i className={`fa-solid ${icon}`} /><h3>{title}</h3></article>)}</div></div></section>

      <section className="careers-reference-cta"><div className="container"><h2>Join us in creating a cleaner, safer and brighter world.</h2><Link to="/contact" className="btn btn-white">Talk to our team <i className="fa-solid fa-arrow-right" /></Link></div></section>
    </main>
  );
}
