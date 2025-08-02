import React from 'react';
import { useUserSettings } from '@/state/useUserSettings';

const themes: Array<'Default' | 'Professional' | 'IceCream' | 'SoftOcean' | 'Evergreen'> = [
    'Default',
    'Professional',
    'IceCream',
    'SoftOcean',
    'Evergreen'
];

export default function UserSettings() {
    const currentTheme = useUserSettings((state) => state.currentTheme);
    const setTheme = useUserSettings((state) => state.setTheme);

    return (
        <div
            style={{
                padding: '1rem',
                minWidth: '200px',
            }}
        >
            <div style={{ marginBottom: '1rem' }}>
                <label
                    htmlFor="theme-select"
                    style={{ display: 'block', marginBottom: '0.25rem' }}
                >
                    Node Theme
                </label>
                <select
                    id="theme-select"
                    value={currentTheme}
                    onChange={(e) => setTheme(e.target.value as any)}
                    style={{
                        width: '100%',
                        padding: '0.4rem',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                    }}
                >
                    {themes.map((theme) => (
                        <option key={theme} value={theme}>
                            {theme}
                        </option>
                    ))}
                </select>
            </div>

            {/* Future settings can go here */}
            {/* Example: <DarkModeToggle />, <EdgeStyleSelector />, etc. */}
        </div>
    );
}
