export type createSche = {
    MemberId?: number|null,
    ManagerId?: number|null,
    Start: string,
    End: string,
    StatusUpdate?: number |null
  }

export type RequestBody={
    SAVE : createSche
}

