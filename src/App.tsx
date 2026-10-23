import { useEffect, useMemo, useState } from 'react'

const EVENT_DATE = new Date('2026-11-10T00:00:00')
const LOCATION_URL = ''

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(): TimeLeft {
  const distance = Math.max(0, EVENT_DATE.getTime() - Date.now())

  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance / 3_600_000) % 24),
    minutes: Math.floor((distance / 60_000) % 60),
    seconds: Math.floor((distance / 1_000) % 60),
  }
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 2v3M17 2v3M3.5 9h17M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
      <path d="M7.5 13h.01M12 13h.01M16.5 13h.01M7.5 17h.01M12 17h.01" />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

function Ornament() {
  return (
    <div className="ornament" aria-hidden="true">
      <i />
      <span>✦</span>
      <i />
    </div>
  )
}

export default function App() {
  const [revealed, setRevealed] = useState(false)
  const [timeLeft, setTimeLeft] = useState(getTimeLeft)

  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const countdown = useMemo(
    () => [
      { label: 'يوم', value: timeLeft.days },
      { label: 'ساعة', value: timeLeft.hours },
      { label: 'دقيقة', value: timeLeft.minutes },
      { label: 'ثانية', value: timeLeft.seconds },
    ],
    [timeLeft],
  )

  return (
    <main className={`invitation-page ${revealed ? 'is-revealed' : ''}`} dir="rtl">
      <div className="page-backdrop" aria-hidden="true" />

      <section className="opening-scene">
        <p className="opening-title">بكل الحب ندعوكم</p>
        <Ornament />

        <div className="tap-note" aria-hidden={revealed}>
          <span>اضغط على الظرف لرؤية الدعوة</span>
          <svg viewBox="0 0 75 85" aria-hidden="true">
            <path d="M12 6c39 12 54 33 34 56-9 10-20 13-31 8" />
            <path d="M25 61 13 70l13 8" />
          </svg>
        </div>

        <div className="envelope-area">
          <button
            type="button"
            className="embroidered-envelope"
            onClick={() => setRevealed(true)}
            aria-label="اضغط على الظرف لرؤية الدعوة"
            aria-expanded={revealed}
          >
            <div className="envelope-crop">
              <img
                className="envelope-photo"
                src={`${import.meta.env.BASE_URL}assets/envelope-transparent.png`}
                alt="ظرف وردي مطرز بالزهور"
              />
              <div className="paper-title">
                <span>سهرية</span>
                <strong>اللا إسراء</strong>
              </div>
              <div className="closing-flap">
                <span className="flap-flower">✿</span>
              </div>
            </div>
          </button>

          <div className="envelope-date" aria-hidden={revealed}>
            <i />
            <time dateTime="2026-11-10">10 \ 11 \ 2026</time>
            <i />
          </div>
        </div>

        <div className="scroll-cue" aria-hidden={!revealed}>
          <span>تفاصيل الدعوة</span>
          <i />
        </div>
      </section>

      <section className="invitation-details" aria-hidden={!revealed}>
        <div className="details-card">
          <header>
            <span className="details-kicker">باقي على ليلتنا</span>
            <h2>موعد الفرح</h2>
          </header>

          <div className="countdown" role="timer" aria-label="الوقت المتبقي لموعد السهرية">
            {countdown.map((item) => (
              <div className="countdown-unit" key={item.label}>
                <strong>{String(item.value).padStart(2, '0')}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <Ornament />

          <div className="poem">
            <p>تستاهلي يا سريوة</p>
            <p>وتستاهلي ديوان مش قصيدة</p>
            <p>وتستاهلي قلادة ذهب وحديدة</p>
          </div>

          <div className="invitation-copy">
            <span>بكل حب وود</span>
            <p>
              تتشرف حرم السيد
              <strong> محمد المائل </strong>
              بدعوتكم لحضور سهرية ابنتهم
            </p>
            <h1>إسراء</h1>
            <p>وذلك بمشيئة الله تعالى</p>
          </div>

          <div className="event-info">
            <div className="info-row">
              <span className="info-icon">
                <CalendarIcon />
              </span>
              <div>
                <small>التاريخ</small>
                <strong>10 \ 11 \ 2026</strong>
                <span>يوم الثلاثاء</span>
              </div>
            </div>

            {LOCATION_URL ? (
              <a className="info-row location-row" href={LOCATION_URL} target="_blank" rel="noreferrer">
                <span className="info-icon">
                  <LocationIcon />
                </span>
                <div>
                  <small>الموقع</small>
                  <strong>اضغط لفتح موقع الصالة</strong>
                  <span>خرائط Google</span>
                </div>
              </a>
            ) : (
              <div className="info-row location-row">
                <span className="info-icon">
                  <LocationIcon />
                </span>
                <div>
                  <small>الموقع</small>
                  <strong>موقع الصالة</strong>
                  <span>يُضاف رابط خرائط Google هنا</span>
                </div>
              </div>
            )}
          </div>

          <footer>
            <Ornament />
            <p>وجودكم يسعدنا ويكمل فرحتنا</p>
          </footer>
        </div>
      </section>
    </main>
  )
}
