import Link from "next/link";

export default function MessagesPage() {
  return (
    <div>
      <h1>All Messages</h1>
      <ul>
        <li>
          <Link href="/m/t/1">Message Thread 1</Link>
        </li>
        <li>
          <Link href="/m/t/2">Message Thread 2</Link>
        </li>
        <li>
          <Link href="/m/t/3">Message Thread 3</Link>
        </li>
      </ul>
    </div>
  );
}
