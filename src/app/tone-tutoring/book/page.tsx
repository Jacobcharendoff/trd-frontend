import Link from 'next/link';
import BookingCalendar from '@/components/BookingCalendar';
import { TONE_EMBED_URL } from '@/lib/booking';

/** Where Tone Tutoring buyers pick their session time (link in the purchase email). */
export default function ToneBookPage() {
  return (
    <div className="bg-white pt-24 sm:pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6">
          <p className="trd-eyebrow text-black/40 mb-4">Tone Tutoring</p>
          <h1 className="text-black font-bold tracking-[-0.04em] leading-[1.05] text-[clamp(30px,4.5vw,46px)] mb-3">
            Pick a time for <span className="trd-gradient-text">your session.</span>
          </h1>
          <p className="text-[#1d1d1f]/60 text-[16px] sm:text-lg max-w-xl mx-auto">
            60 minutes on Google Meet with Vince. Book a time below and the invite lands in your inbox. Nothing to install.
          </p>
        </div>

        <div className="bg-[#f5f5f7] rounded-[28px] p-2 sm:p-5 border border-black/[0.04]">
          <BookingCalendar
            source="tone_book"
            embedUrl={TONE_EMBED_URL}
            bookedEndpoint="/api/tone/booked"
            meeting="tone_tutoring_session"
          />
        </div>

        <p className="text-center text-[14px] text-black/55 mt-5">
          None of these times work? Email{' '}
          <a href="mailto:vince@therigdr.com" className="text-black/80 underline underline-offset-2">
            vince@therigdr.com
          </a>{' '}
          with a few that do and he&apos;ll make it work.
        </p>
        <p className="text-center text-[14px] text-black/50 mt-2">
          Want a head start? Send Vince what&apos;s on your board and what&apos;s bugging you before the call.
        </p>
        <p className="text-center text-[14px] text-black/45 mt-8">
          Haven&apos;t booked Tone Tutoring yet?{' '}
          <Link href="/tone-tutoring" className="text-black/70 underline underline-offset-2">
            It&apos;s $99 for the hour
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
