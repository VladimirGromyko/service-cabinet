import s from "@/components/ServiceJournal/JournalHeader/JournalHeader.module.scss";
import {useRouter} from "next/navigation";
import Image from "next/image";

export const JournalHeader = () => {
    const router = useRouter()
    return (
        <span className={s.headerWrapper}>
          <span className={s.infoRow} onClick={() => router.push('/')}>
              <Image
                  src="/vercel.svg"
                  alt="Vercel Logo"
                  className={s.vercelLogo}
                  width={100}
                  height={24}
                  priority
              />
          </span>
          <span className={s.infoRow}>
                <span className={s.infoItem}>Уведомления</span>
                <span className={s.infoItem}>Обращения</span>
            </span>
          <span className={s.infoRow}>
                <span className={s.infoItem}>Новое обращение</span>
                <span className={s.infoItem}>Кабинет</span>
            </span>
      </span>
    )
}