import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
import { z } from 'zod';
import { InputTask } from './components/TaskInput';
import { TaskInputSelect } from './components/TaskInputSelect';
import { Button } from '../';
import './TaskForm.css'

export const TaskForm = ({ texts, textsButtons, onAddTask, onEditTask, taskBeingEdited }) => {
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
        { label: texts.priorityLow, value: 'low' },
        { label: texts.priorityMedium, value: 'medium' },
        { label: texts.priorityHigh, value: 'high' },
    ];

    const statusOptions = [
        { label: texts.statusPending, value: 'pending' },
        { label: texts.statusInProgress, value: 'in progress' },
        { label: texts.statusCompleted, value: 'completed' },
    ];

    const handleFormSubmit = (data) => {
        if (taskBeingEdited) {
            onEditTask({ ...taskBeingEdited, ...data });
        } else {
            onAddTask(data);
        }
    };

    const {
        control,
        formState: { errors },
        reset,
        handleSubmit,
        clearErrors,
    } = useForm({
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
        if (taskBeingEdited) {
            reset(taskBeingEdited);
        }
    }, [taskBeingEdited, reset]);

    useEffect(() => {
        clearErrors();
    }, [texts, clearErrors]);

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <InputTask name="title" control={control} label={texts.titleLabel} type="text" error={errors.title} />
            <InputTask name="description" control={control} label={texts.descriptionLabel} type="text" error={errors.description} />
            <InputTask name="dueDate" control={control} label={texts.dueDateLabel} type="date" error={errors.dueDate} />
            <TaskInputSelect name="priority" control={control} label={texts.priorityLabel} options={priorityOptions} error={errors.priority} texts={texts} />
            <TaskInputSelect name="status" control={control} label={texts.statusLabel} options={statusOptions} error={errors.status} texts={texts} />
            <Button label={textsButtons.add} parentMethod={handleSubmit(handleFormSubmit)} />
        </form>
    );
};
