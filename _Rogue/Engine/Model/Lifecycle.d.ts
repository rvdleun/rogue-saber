export default abstract class Lifecycle {
    protected abstract awake(): void;
    protected abstract start(): void;
    protected abstract beforeUpdate(): void;
    protected abstract update(): void;
    protected abstract afterUpdate(): void;
}
