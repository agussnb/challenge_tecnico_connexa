import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
import { z } from 'zod';
import { InputTask } from './components/TaskInput';
import { TaskInputSelect } from './components/TaskInputSelect';
import { Button } from '../';
import './TaskForm.css';
import { useTasks } from '../contexts/TasksContext';
import { useLanguage } from '../contexts/LanguageContext';

export const TaskForm = () => {
    const { taskBeingEdited, addTask, editTask } = useTasks();
    const { texts } = useLanguage();
  
    const taskSchema = useMemo(() => z.object({
        title: z.string().min(5, texts.errors.titleRequired),
        description: z.string().optional(),
        dueDate: z.string().optional(),
        priority: z.string()
            .optional()
            .refine(val => !val || ['low', 'medium', 'high'].includes(val), {
                message: texts.errors.invalidPriority,
            }),
        status: z.string()
            .optional()
            .refine(val => !val || ['pending', 'in progress', 'completed'].includes(val), {
                message: texts.errors.invalidStatus,
            }),
    }), [texts]);

    const resolver = useMemo(() => zodResolver(taskSchema), [taskSchema]);

    const priorityOptions = [
        { label: texts.form.priorityLow, value: 'low' },
        { label: texts.form.priorityMedium, value: 'medium' },
        { label: texts.form.priorityHigh, value: 'high' },
    ];

    const statusOptions = [
        { label: texts.form.statusPending, value: 'pending' },
        { label: texts.form.statusInProgress, value: 'in progress' },
        { label: texts.form.statusCompleted, value: 'completed' },
    ];

    const handleFormSubmit = (data) => {
        if (taskBeingEdited) {
            editTask({ ...taskBeingEdited, ...data }, texts);
        } else {
            addTask(data, texts);
        }
    };

    const { control, formState: { errors }, reset, handleSubmit, clearErrors } = useForm({
        resolver,
        mode: 'onSubmit',
        defaultValues: taskBeingEdited || {
            title: '',
            description: '',
            dueDate: '',
            priority: '',
            status: '',
        },
    });

    useEffect(() => {
        if (taskBeingEdited) reset(taskBeingEdited);
    }, [taskBeingEdited, reset]);

    useEffect(() => { clearErrors(); }, [texts, clearErrors]);

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <InputTask name="title" control={control} label={texts.form.titleLabel} type="text" error={errors.title} />
            <InputTask name="description" control={control} label={texts.form.descriptionLabel} type="text" error={errors.description} />
            <InputTask name="dueDate" control={control} label={texts.form.dueDateLabel} type="date" error={errors.dueDate} />
            <TaskInputSelect name="priority" control={control} label={texts.form.priorityLabel} options={priorityOptions} error={errors.priority} texts={texts} />
            <TaskInputSelect name="status" control={control} label={texts.form.statusLabel} options={statusOptions} error={errors.status} texts={texts} />
            <Button label={texts.buttons.add} parentMethod={handleSubmit(handleFormSubmit)} />
        </form>
    );
};
