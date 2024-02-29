async function getData() {
  const bgRes = await fetch(`https://cyclecms.com/api/v1/websites/airplanejames-com/production/entries/18748a3f-b1dd-495f-9c0c-94ba01f4fc9e`, { cache: 'force-cache' });
  const bgData = await bgRes.json();

  const backgroundImage = bgData.entry.content.source.sizes.large;

  const socialMediaRes = await fetch(`https://cyclecms.com/api/v1/websites/airplanejames-com/production/groups/social-media`, { cache: 'force-cache' });
  const socialData = await socialMediaRes.json();

  const musicLinksRes = await fetch(`https://cyclecms.com/api/v1/websites/airplanejames-com/production/groups/music-profile-links`, { cache: 'force-cache' });
  const musicLinks = await musicLinksRes.json();

  if (!bgRes.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return {
    backgroundImage,
    socialData,
    musicLinks,
  }
}

export default async function Page() {
  const {
    backgroundImage,
    socialData,
    musicLinks
  } = await getData()

  return <main className="relative overflow-hidden" style={{
    background: `url(${backgroundImage}) center`,
  }}>
    <div className="absolute z-10 bg-black opacity-50 h-screen w-screen top-0"></div>
    <div className="relative z-20 flex flex-col justify-between h-screen items-center text-center text-white">
      <header className="flex-1 flex items-center"><div>Airplane James</div></header>
      <section className="flex-1 flex items-center">
        <div>
          {
            musicLinks.group.entries.map((entry) => (
              <div><a href={entry.content.url.value} target="_blank" className="block bg-black hover:bg-white hover:text-black p-3 px-8 font-medium rounded my-2">{ entry.content.title.value }</a></div>
            ))
          }
        </div>
      </section>

      <footer className="flex-1 flex items-center">
        <div>
        {
          socialData.group.entries.map((entry) => (
            <a href={entry.content.url.value} className="inline-block text-sm p-3 px-5 rounded m-2 font-medium hover:underline">{ entry.content.title.value }</a>
          ))
        }
        </div>
      </footer>
    </div>
  </main>
}
