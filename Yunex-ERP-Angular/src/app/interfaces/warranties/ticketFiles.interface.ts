export interface TicketFiles{
    started:file,
    accepted:file,
    waiting:file,
    storage:file,
    sendingSupplier:file,
    supplier:file,
    laboratory:file,
    newModule:file,
    solved:file,
    finished:file,
    approved:file,
    warrantyDenied:file
}
export interface file{
    name:string,
    file:string,
    phase:string,
    mimetype:string,
    user:string
}