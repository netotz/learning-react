export interface Task {
    id: number;
    text: string;
    isDone: boolean;
    lastModified: Date;
}

export function sortTasks(tasks: Task[]) {
    return tasks.sort((t1, t2) =>
        // sort by active first
        Number(t1.isDone) - Number(t2.isDone)
        // then by last modified first
        || t2.lastModified.valueOf() - t1.lastModified.valueOf());
}