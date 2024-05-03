export interface NavigationObject {
    name: string;
    path: string;
    children?: NavigationObject[];
    icon?: string;
    disabled?: boolean;
}
