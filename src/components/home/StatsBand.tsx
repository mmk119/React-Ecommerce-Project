import { stats } from '../../data/site'

export default function StatsBand() {
  return (
    <section className="stats">
      <div className="stats__grid container">
        {stats.map((stat) => (
          <div key={stat.label} className="stat">
            <p className="stat__value">{stat.value}</p>
            <p className="stat__label">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
