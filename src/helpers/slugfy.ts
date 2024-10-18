import { convert } from 'url-slug';

export const slugfy = (value: string) => {

    return convert(value, {
        dictionary: {
            "'": "",
        }
    });
}