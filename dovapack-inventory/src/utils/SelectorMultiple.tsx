import './SelectorMultiple.css';

export default function SelectorMultiple(props: selectorMultipleProps) {

    function select(item: selectorMultipleModel) {
        const selected = [...props.selected, item];
        const noSelected = [...props.notSelected.filter(value => value !== item)];
        props.onChange(selected, noSelected);
    }

    function unSelect(item: selectorMultipleModel) {
        const selected = props.selected.filter(value => value !== item);
        const noSelected = [...props.notSelected, item];
        props.onChange(selected, noSelected);
    }

    function selectAll() {
        const selected = [...props.selected, ...props.notSelected];
        const noSelected: selectorMultipleModel[] = [];
        props.onChange(selected, noSelected);
    }

    function unSelectAll() {
        const noSelected = [...props.notSelected, ...props.selected];
        const selected: selectorMultipleModel[] = [];
        props.onChange(selected, noSelected);
    }

    return (
        <div className="selector-multiple">
            <ul>
                {props.notSelected.map(item =>
                    <li key={item.key} onClick={() => select(item)}>{item.value}</li>
                )}
            </ul>
            <div className="selector-multiple-botones">
                <button type="button" onClick={selectAll}>{'>>'}</button>
                <button type="button" onClick={unSelectAll}>{'<<'}</button>
            </div>

            <ul>
                {props.selected.map(item =>
                    <li key={item.key} onClick={() => unSelect(item)}>{item.value}</li>)}
            </ul>
        </div>
    );
}

interface selectorMultipleProps {
    selected: selectorMultipleModel[];
    notSelected: selectorMultipleModel[];
    onChange(
        selected: selectorMultipleModel[],
        notSelected: selectorMultipleModel[]
    ): void;
}

export interface selectorMultipleModel {
    key: number;
    value: string;
}
