/* 
|----------------------------------------- 
| MultiSelect Demo Page
| @author: Toufiquer Rahman<toufiquer.0@gmail.com> 
| @copyright: tecmart-template, May, 2025 
|----------------------------------------- 
*/

// File: DataSelect.tsx
'use client';

import React, { useState, useEffect } from 'react';
import MultiSelect from './MultiSelect'; // Assuming MultiSelect.tsx is in the same directory

interface DataSelectProps {
  newItemTags: string[];
  setNewItemTags: (payload: string[]) => void;
  label?: string; // Added from your original MultiSelectDemo
  placeholder?: string; // Added from your original MultiSelectDemo
}

export default function DataSelect({
  newItemTags,
  setNewItemTags,
  label = 'Select Tags', // Default value
  placeholder = 'Choose tags for your item', // Default value
}: DataSelectProps) {
  // Local state to manage the selection within DataSelect
  const [currentSelection, setCurrentSelection] = useState<string[]>(newItemTags);

  // Effect to synchronize local state when the `newItemTags` prop changes from the parent
  // This is important for scenarios like form resets or when initial data is loaded asynchronously.
  useEffect(() => {
    // Only update local state if the incoming prop is actually different.
    // Comparing stringified versions is a common way for simple arrays.
    if (JSON.stringify(newItemTags) !== JSON.stringify(currentSelection)) {
      setCurrentSelection(newItemTags);
    }
    // We only want this effect to run when newItemTags (from parent) changes.
    // Adding currentSelection to dependencies could cause issues if not handled carefully.
  }, [newItemTags, currentSelection]);

  const handleSelectionChange = (newSelectionFromMultiSelect: string[]) => {
    // Check if the new selection from MultiSelect is actually different from our current local state.
    // This is crucial to break the potential infinite loop.
    if (JSON.stringify(newSelectionFromMultiSelect) !== JSON.stringify(currentSelection)) {
      setCurrentSelection(newSelectionFromMultiSelect); // Update local state
      setNewItemTags(newSelectionFromMultiSelect); // Propagate change to parent
    } else {
      // If the content is the same but the array reference might be different,
      // we can update our local state to the new reference without notifying the parent.
      // This handles cases where MultiSelect might return a new array instance for the same content.
      if (newSelectionFromMultiSelect !== currentSelection) {
        setCurrentSelection(newSelectionFromMultiSelect);
      }
      // If content and reference are same, or content is same and we don't propagate, the loop is broken.
    }
  };

  return (
    // The container div and form from MultiSelectDemo might be context-specific.
    // If DataSelect is a general wrapper, it might not need them.
    // For this solution, I'm keeping the structure from your MultiSelectDemo.
    <div className="container mx-auto">
      <form id="add-form" className="space-y-4">
        <MultiSelect
          label={label}
          placeholder={placeholder}
          // Pass the local state to MultiSelect.
          // `MultiSelect` should use this to display its current selection.
          // If `MultiSelect` only uses `defaultSelected` for initial values and
          // then manages its own state, this interaction needs to be clear.
          // Assuming `defaultSelected` is how `MultiSelect` receives its current value.
          defaultSelected={currentSelection}
          onSelectionChange={handleSelectionChange}
        />
      </form>
    </div>
  );
}
