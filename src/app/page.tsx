import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import {routes} from "@/navigation/Paths";
import {cookies} from "next/headers";

export default function Home() {
    // async function createAuth() {
    //     "use server";
    //
    //     // const selectedAuth ="auth";
    //     cookies().set("auth") //, selectedAuth);
    // }
    // createAuth()
  return (
      <main className={styles.main}>
          <div className={styles.description}>
            <span>ЭТО ГЛАВНАЯ СТРАНИЦА</span>

            <div className={styles.header}>
              <Link
                href="/journal"
              >
                  Журналы
              </Link>
              <Link href='/products'  >
                    Продукты
              </Link>
              <Link href='/login'  >
                  Логин
              </Link>

            </div>
          </div>

      </main>
  );
}
