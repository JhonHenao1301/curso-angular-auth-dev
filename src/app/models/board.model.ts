import { Card } from "./card.model";
import { Colors } from "./colors.model";
import { List } from "./list.model";

export interface Board {
    id:                 number;
    title:              string;
    backgroundColor:    Colors
    creationAt:         Date;
    updatedAt:          Date;
    members:            Member[];
    lists:              List[];
    cards:              Card[]
}

export interface UpdateBoardDto {
    title: string;
}

export interface Member {
    id:         number;
    name:       string;
    email:      string;
    avatar:     string;
    creationAt: Date;
    updatedAt:  Date;
}