export interface pin {
    _id?: string
    username: string,
    title: string,
    description: string,
    rating: string,
    latitude: number,
    longitude: number,
    image?: string,
    video?: string,
    createdAt?: Date,
    updatedAt?: Date
}