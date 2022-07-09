export default function Home() {
    return (
        <div className="container">
            <main className={'main'}>
                <h1 className={'title'}>
                    Welcome to <a href="https://nextjs.org">Next.js!</a>
                </h1>

                <p className={'description'}>
                    Get started by editing{' '}
                    <code className={'code'}>pages/index.js</code>
                </p>

                <div className={'grid'}>
                    <a href="./centers/" className={'card'}>
                        <h4>See all Centers &rarr;</h4>
                        <p>Find in-depth information about this center.</p>
                    </a>
                </div>
            </main>
        </div>
    )
}
