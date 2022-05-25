export function useformatTime(t) {
    let json_time = new Date(t).toJSON();
    return new Date(new Date(json_time) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
}