export interface UnitDto {
    id: number;
    measurement: string;
}

export interface UnitInput {
    measurement: string;
}

export interface CreateUnitsRequest {
    units: UnitInput[];
}

export interface GetUnitsResponse {
    units: UnitDto[];
}