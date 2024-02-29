import Image from "next/image";

async function getData() {
  const bgRes = await fetch(`https://cyclecms.com/api/v1/websites/airplanejames-com/production/entries/18748a3f-b1dd-495f-9c0c-94ba01f4fc9e`, { cache: 'force-cache' });
  const bgData = await bgRes.json();

  const backgroundImage = bgData.entry.content.source.sizes.large;

  const socialMediaRes = await fetch(`https://cyclecms.com/api/v1/websites/airplanejames-com/production/groups/social-media`, { cache: 'force-cache' });
  const socialData = await socialMediaRes.json();

  const musicLinksRes = await fetch(`https://cyclecms.com/api/v1/websites/airplanejames-com/production/groups/music-profile-links`, { cache: 'force-cache' });
  const musicLinks = await musicLinksRes.json();

  const heroRes = await fetch(`https://cyclecms.com/api/v1/websites/airplanejames-com/production/entries/hero-graphic`, { cache: 'force-cache' });
  const heroData = await heroRes.json();

  if (!bgRes.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return {
    backgroundImage,
    socialData,
    musicLinks,
    heroData,
  }
}

export default async function Page() {
  const {
    backgroundImage,
    socialData,
    musicLinks,
    heroData,
  } = await getData()

  console.log('heroData', heroData);

  return <main className="relative overflow-hidden" style={{
    background: `url(${backgroundImage}) center`,
  }}>
    <div className="absolute z-10 bg-black opacity-50 h-screen w-screen top-0"></div>
    <div className="relative z-20 flex flex-col justify-between h-screen items-center text-center text-white">
      <header className="flex-1 flex items-center">
        {
          heroData.entry.content.url.value != "" ? (
              <a href={heroData.entry.content.url} target="_blank">
                <img style={{ maxWidth: 300, width: '100%', height: 'auto' }} alt={heroData.entry.content.alt.value} src={heroData.entry.content.image.sizes.medium} />
              </a>
            ) : (
            <img style={{ maxWidth: 300, width: '100%', height: 'auto' }} alt={heroData.entry.content.alt.value} src={heroData.entry.content.image.sizes.medium} />
          )
        }

      </header>
      <section className="flex-1 flex items-center">
        <div>
          {
            musicLinks.group.entries.map((entry) => (
              <div><a href={entry.content.url.value} target="_blank" className="block bg-black hover:bg-white hover:text-black p-3 px-8 font-medium rounded my-2">{ entry.content.title.value }</a></div>
            ))
          }
        </div>
      </section>

      <footer className="flex-1 flex-col items-center">
        <div className="flex">
        {
          socialData.group.entries.map((entry) => (
            <a href={entry.content.url.value} className="inline-block text-sm p-3 px-5 rounded m-2 font-medium hover:underline">{ entry.content.title.value }</a>
          ))
        }
        </div>

        <div class="flex gap-8 justify-center mt-8">
          <img style={{ height: 60 }} alt="Airplane James logo" src="https://assets.cyclecms.com/xrDgZG9VtZrSXI8L98UtzJ1JrmpYppq6Fqds4CQ_oI4/plain/s3://cyclecms/ww7roiii9bc9xswxl8ljhh7rrrf2" />
          <img style={{ height: 60 }} alt="Diamond Lane Music Group logo" src="https://assets.cyclecms.com/QuuIuaQDljzykZh6QDuTE0ks1jgTkIfezQ_RKKp5-gI/plain/s3://cyclecms/saitgvskpp2qwtwiwf2i9791z9ui" />

        </div>
      </footer>
      <a href="https://cg3.media" class="fixed right-5 bottom-5 text-xs font-medium px-1 bg-black text-white hover:bg-white hover:text-black" target="_blank">Site by CG3 Media</a>
    </div>
  </main>
}
