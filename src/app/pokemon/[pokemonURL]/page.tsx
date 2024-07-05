import CrySFX from "@/app/_components/PokemonPage/CrySFX";
import PreviousPage from "@/app/_components/PreviousPage";
import { pokemonColorVariants } from "@/app/_lib/colorVariants";
import {
  getPokemon,
  getPokemonEvolutionChain,
  getPokemonSpecies,
} from "@/app/_lib/pokemonAPI";
import Link from "next/link";
import Image from "next/image";
import StatsBar from "@/app/_components/PokemonPage/StatsBar";
import PokemonImage from "@/app/_components/PokemonPage/PokemonImage";
import ToggleFavorite from "@/app/_components/ToggleFavorite";

type CardKey = keyof typeof pokemonColorVariants.card;
type TagKey = keyof typeof pokemonColorVariants.tag;

export default async function SpecificPokemonPage({
  params,
}: {
  params: { pokemonURL: string };
}) {
  const { pokemonURL } = params;

  try {
    const data = await getPokemon(
      "https://pokeapi.co/api/v2/pokemon/" + pokemonURL
    );

    const primaryType = data.types.length > 0 ? data.types[0].type.name : "all";
    const speciesData = await getPokemonSpecies(data.id.toString());
    const evolutionChainURL = speciesData.evolution_chain.url;
    const evolutionData = await getPokemonEvolutionChain(evolutionChainURL);

    const normalImageUrl =
      data.sprites?.other?.home?.front_default || data.sprites?.front_default;
    const shinyImageUrl =
      data.sprites?.other?.home?.front_shiny || data.sprites?.front_shiny;

    const flavor_text = speciesData.flavor_text_entries.find(
      (entry: any) =>
        entry.language.url === "https://pokeapi.co/api/v2/language/9/"
    );

    return (
      <article
        className={`relative h-full p-6 md:p-10 rounded-3xl text-black ${
          pokemonColorVariants.card[primaryType as CardKey]
        }`}
      >
        <div className="flex justify-between">
          <PreviousPage />

          {data.id && (
            <div className="flex">
              <ToggleFavorite
                id={data.id.toString()}
                name={data.name}
                url={"https://pokeapi.co/api/v2/pokemon/" + pokemonURL}
              />
            </div>
          )}
        </div>

        <div className="mt-8 grid grid-rows-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="order-last md:order-first py-4 md:py-0">
            <div className="hidden md:block">
              <p className="opacity-80 text-lg font-normal sm:text-lg sm:leading-4 md:text-xl md:leading-4">
                #{data.id.toString().padStart(3, "0")}
              </p>
              <h1 className="capitalize">{pokemonURL.replace(/-/g, " ")}</h1>
              <div className="flex py-1 gap-1">
                {data.types.map((types: any) => {
                  return (
                    <div
                      key={types.slot}
                      className={`rounded-full p-1 px-2 lg:px-3 capitalize text-sm lg:text-base ${
                        pokemonColorVariants.tag[types.type.name as TagKey]
                      }`}
                    >
                      {types.type.name}
                    </div>
                  );
                })}
              </div>
              <br></br>
            </div>

            <p className="subtitle">Description</p>
            <p className="subtitle-p md:py-1 max-w-prose">
              {flavor_text.flavor_text.replace(/[^a-zA-Z0-9\s.,'-]/g, "")}
            </p>
            <br></br>
            <p className="subtitle">Height</p>
            <p className="subtitle-p">{data.height * 10} centimeters</p>
            <br></br>
            <p className="subtitle">Weight</p>
            <p className="subtitle-p">{data.weight / 10} kilograms</p>
            <br></br>
            <p className="subtitle">Abilities</p>
            {data.abilities.map((ability: any) => {
              return (
                <li
                  className="subtitle-p capitalize"
                  key={ability.ability.name}
                >
                  {ability.ability.name.replace(/-/g, " ")}
                </li>
              );
            })}
            <br></br>
            <p className="subtitle">Cries</p>
            <div className="flex flex-col gap-1">
              <CrySFX source={data.cries.latest}>▶ Latest SFX</CrySFX>
              {data.cries.legacy && (
                <CrySFX source={data.cries.legacy}>▶ Legacy SFX</CrySFX>
              )}
            </div>
            <br></br>
            <p className="subtitle">Base Experience</p>
            <p className="subtitle-p">
              {data.base_experience} EXP gained for defeating this Pokémon
            </p>
            <br></br>
            <p className="subtitle">Evolution Chain</p>
            <div className="flex gap-2">
              <p className="subtitle-p capitalize">
                <Link href={"/pokemon/" + evolutionData.species.name}>
                  {evolutionData.species.name}
                </Link>
              </p>
              <p className="subtitle-p capitalize">
                {evolutionData.evolves_to[0]?.species.name && "> "}
                <Link
                  href={"/pokemon/" + evolutionData.evolves_to[0]?.species.name}
                >
                  {evolutionData.evolves_to[0]?.species.name}
                </Link>
              </p>
              <div className="subtitle-p capitalize">
                {evolutionData.evolves_to[0]?.evolves_to[0]?.species.name &&
                  "> "}

                <Link
                  href={
                    "/pokemon/" +
                    evolutionData.evolves_to[0]?.evolves_to[0]?.species.name
                  }
                >
                  {evolutionData.evolves_to[0]?.evolves_to[0]?.species.name}
                </Link>
              </div>
            </div>
          </div>

          <div className="justify-self-center md:justify-self-end w-fit h-fit md:pl-4">
            <div className="md:hidden">
              <p className="opacity-80 text-lg font-normal sm:text-lg sm:leading-4 md:text-xl md:leading-4">
                #{data.id.toString().padStart(3, "0")}
              </p>
              <h1 className="capitalize text-3xl">
                {pokemonURL.replace(/-/g, " ")}
              </h1>
              <div className="flex py-1 gap-1">
                {data.types.map((types: any) => {
                  return (
                    <div
                      key={types.slot}
                      className={`rounded-full p-1 px-2 lg:px-3 capitalize text-sm lg:text-base ${
                        pokemonColorVariants.tag[types.type.name as TagKey]
                      }`}
                    >
                      {types.type.name}
                    </div>
                  );
                })}
              </div>
            </div>
            <PokemonImage
              normalImageUrl={normalImageUrl}
              shinyImageUrl={shinyImageUrl}
              name={data.name}
            />
            <div className="lg:hidden py-6 flex flex-col gap-2">
              {data.stats.map((stat: any) => {
                return (
                  <div key={stat.stat.name}>
                    <div className="flex justify-between">
                      <b className="capitalize">
                        {stat.stat.name.replace(/-/g, " ")}
                      </b>
                      <p>{stat.base_stat}/200</p>
                    </div>
                    <StatsBar baseStat={stat.base_stat} />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="py-4 md:pl-8 flex flex-col gap-2 ">
              {data.stats.map((stat: any) => {
                return (
                  <div key={"_" + stat.stat.name}>
                    <div className="flex justify-between">
                      <b className="capitalize">
                        {stat.stat.name.replace(/-/g, " ")}
                      </b>
                      <p>{stat.base_stat}/200</p>
                    </div>
                    <StatsBar baseStat={stat.base_stat} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </article>
    );
  } catch (err) {
    console.log(err);
    return (
      <div>
        <PreviousPage />
        <h1>Error</h1>
        <p>An error occurred while fetching data</p>
      </div>
    );
  }
}
