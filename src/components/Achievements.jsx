import { Award, Trophy, Medal, BadgeCheck } from 'lucide-react';

const achievements = [
  { icon: Trophy, title: 'Second Prize – Intra-College Project Presentation', detail: 'Recognized for project presentation and implementation.' },
  { icon: Medal, title: 'Runner-Up – Datchan Academy Hackathon', detail: 'Awarded ₹1,000 for the hackathon project.' },
  { icon: Award, title: 'Cognizant Technoverse Hackathon 2026', detail: 'Participated in a collaborative technology challenge.' },
  { icon: Award, title: '24-Hour Hackathon – Coimbatore Institute of Technology', detail: 'Contributed to a time-bound team development event.' },
  { icon: Award, title: 'Hackathon – Karpagam Academy of Higher Education', detail: 'Participated in an inter-college hackathon.' },
  { icon: BadgeCheck, title: 'Programming in Java – NPTEL Elite 96%', detail: 'Completed the NPTEL Java programming certification.' },
  { icon: BadgeCheck, title: 'Career Essentials in GitHub', detail: 'Microsoft & LinkedIn.' },
];

export default function Achievements() {
  return <section className="section achievements" id="achievements"><div className="container">
    <h2 className="section-title">Achievements & Certifications</h2>
    <div className="awards-grid">
      {achievements.map(({ icon: Icon, title, detail }) => <article className="award-card glass-card" key={title}>
        <div className="award-image-placeholder"><Icon size={25} /></div>
        <div className="award-body"><h3>{title}</h3><p>{detail}</p></div>
      </article>)}
    </div>
  </div></section>;
}
