import pokemon from './pokemon.json';

export const pokedex = pokemon;
export const regions = [...new Set(pokedex.map((entry) => entry.originRegion))];
export const games = [...new Set(pokedex.flatMap((entry) => entry.debutGames))];
export const types = [...new Set(pokedex.flatMap((entry) => entry.types))]
    .sort((first, second) => first.localeCompare(second, 'ko'));

export const statLabels = {
    hp: 'HP',
    attack: '공격',
    defense: '방어',
    specialAttack: '특수공격',
    specialDefense: '특수방어',
    speed: '스피드',
};

export function dexLabel(number) {
    return `#${String(number).padStart(3, '0')}`;
}

export function statTotal(entry) {
    return Object.values(entry.baseStats).reduce((total, value) => total + value, 0);
}

export function readFilters(params) {
    return {
        q: params.get('q') ?? '',
        region: params.get('region') ?? '',
        game: params.get('game') ?? '',
        type: params.get('type') ?? '',
        min: params.get('min') ?? '',
        max: params.get('max') ?? '',
        favorites: params.get('favorites') === '1',
    };
}

export function filterParams(filters) {
    return Object.fromEntries(Object.entries(filters)
        .filter(([, value]) => value !== '' && value !== false)
        .map(([field, value]) => [field, value === true ? '1' : value]));
}

export function rangeError({ min, max }) {
    const invalid = [min, max].some((value) => value !== '' && !/^\d+$/.test(value));
    if (invalid) return '종족값 합계는 0 이상의 정수로 입력해 주세요.';
    if (min !== '' && max !== '' && Number(min) > Number(max)) {
        return '최솟값은 최댓값 이하여야 합니다.';
    }
    return '';
}

export function filterPokemon(filters, favorites) {
    if (rangeError(filters)) return [];

    const query = filters.q.trim().normalize('NFKC').toLowerCase();
    const isNumber = /^#?\d+$/.test(query);
    const wantedNumber = Number(query.replace(/^#/, ''));
    const min = filters.min === '' ? 0 : Number(filters.min);
    const max = filters.max === '' ? Infinity : Number(filters.max);

    return pokedex.filter((entry) => {
        if (isNumber && entry.dexNumber !== wantedNumber) return false;
        if (query && !isNumber && ![entry.nameKo, entry.nameEn]
            .some((name) => name.toLowerCase().includes(query))) return false;
        if (filters.region && entry.originRegion !== filters.region) return false;
        if (filters.game && !entry.debutGames.includes(filters.game)) return false;
        if (filters.type && !entry.types.includes(filters.type)) return false;
        if (filters.favorites && !favorites.includes(entry.dexNumber)) return false;

        const total = statTotal(entry);
        return total >= min && total <= max;
    });
}
